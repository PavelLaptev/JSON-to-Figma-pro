declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

declare type RandomValueTypes = "none" | "normal" | "chaotic";

declare type onChangeType = {
  id: string;
  checked: boolean;
};

declare type onExpandType = {
  id: string;
  expanded: boolean;
};

declare type JSONItemType = {
  type: "group" | "item";
  id: string;
  parentId: string;
  keyName: string;
  checked: boolean;
  isImage?: boolean;
  expanded?: boolean;
  indeterminate?: boolean;
  children?: JSONItemType;
};

declare type JSONconfigType = {
  states: JSONItemType | null;
  originalJSON: any;
  randomType: RandomValueTypes;
  range: {
    from: number;
    to: number;
  };
  checkedItems?: Array<string>;
};

declare type appConfigType = {
  showShortKeyNames: boolean;
  darkMode: boolean;
  svgScale: number;
  proxy: string;
};
