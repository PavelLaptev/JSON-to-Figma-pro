import * as React from "react";

import { ElementCaption, SectionWrapper } from "../../../../elements";

import styles from "./styles.module.scss";

interface Props {
  onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const SkipLayers: React.FC<Props> = (props) => {
  return (
    <SectionWrapper
      className={styles.wrap}
      onChange={props.onSectionChange}
      title="Skip layers"
    >
      <ElementCaption
        text={`Lock 🔒 a layer to skip it in population process.`}
      />
    </SectionWrapper>
  );
};

export default SkipLayers;
