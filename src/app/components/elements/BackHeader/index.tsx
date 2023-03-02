import * as React from "react";
import Icon from "../Icon";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  className?: any;
  onBackClick: () => void;
}

const BackHeader: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.wrap} ${props.className}`}>
      <div className={styles.iconWrap} onClick={props.onBackClick}>
        <Icon name="back-arrow" className={styles.icon} />
      </div>
      <span className={styles.title}>{props.title}</span>
    </div>
  );
};

BackHeader.defaultProps = {
  className: "",
};

export default BackHeader;
