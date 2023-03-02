import * as React from "react";

import {
  BackHeader,
  SectionWrapper,
  Switcher,
  Input,
  ElementCaption,
} from "../../elements";

import styles from "./styles.module.scss";

interface Props {
  onBackClick: () => void;
  onSettingsChange: (settings: {
    showShortKeyNames: boolean;
    darkMode: boolean;
    svgScale: number;
  }) => void;
}

const SettingsView: React.FC<Props> = (props) => {
  const [settings, setSettings] = React.useState({
    showShortKeyNames: false,
    darkMode: false,
    svgScale: 2,
  });

  const handleSVGScaleChange = (e) => {
    // allow only numbers and not bigger than 10 and not less than 1
    const { value } = e.currentTarget;
    const parsedValue = parseInt(value, 10);

    if (parsedValue > 0 && parsedValue <= 10) {
      setSettings({ ...settings, svgScale: parsedValue });
    }
  };

  const handleShortKeyNamesChange = (checked: boolean) => {
    setSettings({ ...settings, showShortKeyNames: checked });
  };

  const handleDarkModeChange = (checked: boolean) => {
    setSettings({ ...settings, darkMode: checked });
  };

  React.useEffect(() => {
    props.onSettingsChange(settings);
  }, [settings]);

  return (
    <main className={styles.wrap}>
      <BackHeader
        title="Settings"
        className={styles.backHeader}
        onBackClick={props.onBackClick}
      />
      <div className={styles.options}>
        <SectionWrapper divider title="Show short key names">
          <Switcher
            id="show-short-keynames"
            label="By default plugin shows full layer names, but you can switch to
              the short mode."
            checked={settings.showShortKeyNames}
            onChange={handleShortKeyNamesChange}
          />
        </SectionWrapper>

        <SectionWrapper divider title="SVG images fetch scale size">
          <Input
            className={`${styles.SVGScaleInput}`}
            value={`${settings.svgScale}`}
            onChange={handleSVGScaleChange}
            type="number"
            min={1}
            max={10}
          />
          <ElementCaption text="By default plugin fetch all images @2x size. Regulate this value but not less than 1 and not bigger than 10." />
        </SectionWrapper>

        <SectionWrapper title="">
          <Switcher
            id="dark-mode"
            label="Enable dark mode 🌚"
            checked={settings.darkMode}
            onChange={handleDarkModeChange}
          />
        </SectionWrapper>
      </div>
    </main>
  );
};

export default SettingsView;
