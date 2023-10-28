import { useState } from "react";
import styles from "../styles/accounting.module.css";
import Link from "next/link";

const Form = ({ onSubmit }) => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);

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

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => {
    return sum + (item.type === "+" ? parseFloat(item.amount) : -parseFloat(item.amount));
  }, 0);

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.Form}>
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
        {items.map((item, index) => (
          <div key={index} className={styles.record}>
            <div className={`${styles.recordAmount} ${item.type === "+" ? styles.incomeColor : styles.expenseColor}`}>
              {item.type}
              {item.amount}
            </div>
            <div className={styles.recordName}> {item.name}</div>
            <div>
              <button className={styles.recordDelete} onClick={() => handleDelete(index)}>
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
