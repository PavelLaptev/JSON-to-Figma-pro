import * as React from "react";

import { Button, ServiceButtons, TrialBanner } from "../../elements";
import logo from "../../../assets/logo.svg";

import styles from "./styles.module.scss";

interface Props {
  fileOnChange(event: React.FormEvent<HTMLInputElement>): void;
  urlOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
  onSettingsClick: () => void;
  daysLeft: number;
}

const LaunchView: React.FC<Props> = (props) => {
  return (
    <main className={styles.wrap}>
      <section className={styles.head}>
        <img className={styles.logo} src={logo} alt="Logo" />
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
          text={"From Clipboard link"}
          onClick={props.urlOnClick}
        />
      </section>

      <ServiceButtons onSettingsClick={props.onSettingsClick} />

      {props.daysLeft > 0 && <TrialBanner daysLeft={props.daysLeft} />}
    </main>
  );
};

export default LaunchView;
