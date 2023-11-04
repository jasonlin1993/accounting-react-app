import React, { useState, useEffect } from "react";
import styles from "../styles/Signin.module.css";
import firebase from "../utils/firebase";
import { useRouter } from "next/router";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  function handleStart() {
    router.push("/accounting");
  }

  function handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {})
      .catch((error) => {
        console.error("登入失敗:", error);
        alert("登入失敗: " + error.message);
      });
  }

  function handleLogout() {
    firebase.auth().signOut();
  }
  if (user) {
    return (
      <div className={styles.SignedIn}>
        <h1>你已經使用 {user.email} 登入</h1>
        <div>
          <button className={styles.checkButton} onClick={handleStart}>
            立即開始
          </button>
          <button className={styles.checkButton} onClick={handleLogout}>
            登出
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.SignIn}>
      <h1>登入系統</h1>
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
            登入
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
