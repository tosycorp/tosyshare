import QRCode from 'qrcode';

export default (text: string) => {
  try {
    return QRCode.toDataURL(text, { width: 300 });
  } catch (err) {
    console.error(err);
  }
  return null;
};
