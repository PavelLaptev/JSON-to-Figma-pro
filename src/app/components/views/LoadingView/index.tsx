import * as React from "react";
import styles from "./styles.module.scss";

interface Props {}

const LoadingView: React.FC<Props> = () => {
  return (
    <main className={styles.wrap}>
      <span>Loading…</span>
    </main>
  );
};

export default LoadingView;
