export default function figmaNotify(text: string, time: number = 1500) {
  figma.notify(text, {
    timeout: time,
  });
}
