import * as React from "react";

import { Link, Button } from "../../elements";
import pluginLogo from "../../../assets/jason-logo.png";

import styles from "./styles.module.scss";

interface Props {
  fileOnChange(event: React.FormEvent<HTMLInputElement>): void;
  urlOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const LaunchView: React.FC<Props> = (props) => {
  return (
    <main className={styles.wrap}>
      <section className={styles.head}>
        <img className={styles.logo} src={pluginLogo} />
      </section>

      <section className={styles.buttonsSection}>
        <Button
          icon="upload"
          fileType
          text={"From local file"}
          onChange={props.fileOnChange}
        />
        <Button
          icon="copyLink"
          title="Copy link and press the button"
          text={"From Clipboard link"}
          onClick={props.urlOnClick}
        />
      </section>
      <section className={styles.links}>
        <p className={styles.caption}>
          Read the{" "}
          <Link
            text="documentation"
            link="https://github.com/PavelLaptev/JSON-to-Figma"
          />
        </p>
        <p className={styles.caption}>
          <Link
            text="Support plugin"
            link="https://www.paypal.com/paypalme/pavellaptev"
          />{" "}
          🧑‍💻
        </p>
      </section>
    </main>
  );
};

export default LaunchView;
