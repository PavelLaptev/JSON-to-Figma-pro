import * as React from "react";

import { LabelTag } from "../";

import styles from "./styles.module.scss";

interface Props {
  title?: string;
  className?: string;
  divider?: boolean;
  LabelTag?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  onChange?(event: React.FormEvent<HTMLInputElement>): void;
  children?: React.ReactNode;
}

const SectionWrapper: React.FC<Props> = (props) => {
  return (
    <section
      className={`${styles.wrap} ${props.className}`}
      onClick={props.onClick}
      onChange={props.onChange}
    >
      {props.title && (
        <span className={styles.titleWrap}>
          <h3 className={styles.title}>{props.title}</h3>
          {props.LabelTag && (
            <LabelTag className={styles.count} label={`${props.LabelTag}`} />
          )}
        </span>
      )}
      {props.children}
      {props.divider ? <div className={styles.divider} /> : null}
    </section>
  );
};

SectionWrapper.defaultProps = {
  title: "Title",
  className: "",
  divider: false,
} as Partial<Props>;

export default SectionWrapper;
