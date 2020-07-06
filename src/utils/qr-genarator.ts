import QRCode from 'qrcode';

export default (text: string) => {
  try {
    return QRCode.toDataURL(text, { scale: 10 });
  } catch (err) {
    console.error(err);
  }
  return null;
};
