import QRCode from 'qrcode';

const generateQr = (text: string) => {
  try {
    return QRCode.toDataURL(text, { width: 240 });
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default generateQr;
