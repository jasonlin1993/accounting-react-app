import React, { useState, useEffect } from "react";
import styles from "../styles/accounting.module.css";
import Link from "next/link";
import firebase from "../utils/firebase";
import "firebase/compat/firestore";

const Form = ({ onSubmit }) => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);
  const [posts, setPosts] = useState([]);

  const allRecords = items
    .map((item, index) => ({
      ...item,
      id: index.toString(),
      isPost: false,
    }))
    .concat(
      posts.map((post) => ({
        ...post,
        name: post.itemName,
        type: post.type === "income" ? "+" : "-",
        isPost: true,
      }))
    );

  const combinedSubmit = (e) => {
    handleSubmit(e);
    firebaseSubmit();
  };

  const handleDelete = async (index, id) => {
    if (id) {
      await deleteRecord(id);
      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
    } else {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      type: type === "income" ? "+" : "-",
      amount: parseFloat(amount),
      name: itemName,
    };
    setItems([...items, newItem]);
    setAmount("");
    setItemName("");
  };

  const deleteRecord = async (id) => {
    const db = firebase.firestore();
    const recordRef = db.collection("record").doc(id);
    await recordRef.delete();
  };

  async function firebaseSubmit() {
    try {
      const db = firebase.firestore();
      const documentId = "record_" + Date.now();
      const documentRef = db.collection("record").doc(documentId);
      await documentRef.set({
        type,
        amount,
        itemName,
        id: documentRef.id,
      });
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("Failed to submit data.");
    }
  }

  useEffect(() => {
    const db = firebase.firestore();
    const collection = db.collection("record");
    collection.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    });
  }, []);

  const totalAmount = allRecords.reduce((sum, record) => {
    return (
      sum + (record.type === "income" || record.type === "+" ? parseFloat(record.amount) : -parseFloat(record.amount))
    );
  }, 0);

  return (
    <div>
      <form onSubmit={combinedSubmit} className={styles.Form}>
        <div>
          <select className={styles.Select} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">收入</option>
            <option value="expense">支出</option>
          </select>
        </div>
        <div>
          <input
            className={styles.Number}
            type="number"
            placeholder="金額"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <input
            className={styles.itemName}
            type="text"
            placeholder="商品名稱"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <button className={styles.submitBtn} type="submit">
            新增紀錄
          </button>
        </div>
      </form>
      <hr />
      <div className={styles.records}>
        {allRecords.map((record, index) => (
          <div key={record.id} className={styles.record}>
            <div className={`${styles.recordAmount} ${record.type === "+" ? styles.incomeColor : styles.expenseColor}`}>
              {record.type}
              {record.amount}
            </div>
            <div className={styles.recordName}> {record.name}</div>
            <div>
              <button
                className={styles.recordDelete}
                onClick={() => handleDelete(record.isPost ? null : index, record.isPost ? record.id : null)}
              >
                刪除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.total}>小計: {totalAmount}</div>
      <div className={styles.backToIndex}>
        <Link href="/">
          <button className={styles.Btn}>返回首頁</button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
