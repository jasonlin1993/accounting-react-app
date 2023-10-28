import Link from "next/link";
import styles from "../styles/homePage.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={styles.header}>React 練習專案</h1>
      <h1 className={styles.section}>歡迎光臨我的頁面</h1>
      <div className={styles.clickBtn}>
        <Link href="/accounting">
          <button className={styles.button}>點此開始</button>
        </Link>
      </div>
    </div>
  );
}
