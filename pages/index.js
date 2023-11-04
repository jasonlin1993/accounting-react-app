import Signin from "./Signin";
import CreateAccount from "./CreateAccount";
import styles from "../styles/homePage.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={styles.header}>React 練習專案</h1>
      <div>
        <Signin />
      </div>
      <hr />
      <div>
        <CreateAccount />
      </div>
    </div>
  );
}
