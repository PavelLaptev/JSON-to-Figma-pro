import { msgTypes } from "../../dataConfig";

export default function figmaNotify(
  type: string = null,
  text: string,
  time: number = 1500
) {
  figma.notify(`${type && `${msgTypes[type].icon} `}${text}`, {
    timeout: time,
  });
}
