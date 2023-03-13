export default function isImageString(value: any) {
  if (
    /.jpg|.gif|.png|.jpeg|.svg|.webp/gm.test(value.toString().toLowerCase())
  ) {
    return true;
  } else {
    return false;
  }
}
