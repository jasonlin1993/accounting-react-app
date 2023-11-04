import React, { useState } from "react";
import styles from "../styles/Signin.module.css";
import firebase from "../utils/firebase";
import { useRouter } from "next/router";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        router.push("/");
      })
      .catch((error) => {
        console.error("註冊失敗:", error);
        alert("註冊失敗: " + error.message);
      });
  }

  return (
    <div className={styles.SignIn}>
      <h1>註冊帳戶</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.Email}>
          <label>電郵</label>
          <input className={styles.inputBox} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.Password}>
          <label>密碼</label>
          <input
            className={styles.inputBox}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.Button}>
          <button className={styles.ButtonBox} type="submit">
            註冊
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
