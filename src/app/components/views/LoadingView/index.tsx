import * as React from "react";
import styles from "./styles.module.scss";

interface Props {}

const LoadingView: React.FC<Props> = () => {
  return <main className={styles.wrap}>Loading…</main>;
};

export default LoadingView;
