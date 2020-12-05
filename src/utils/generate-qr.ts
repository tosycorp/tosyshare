import QRCode from 'qrcode';

const generateQr = (text: string) => {
  try {
    return QRCode.toDataURL(text, {
      width: 120,
      margin: 1,
      color: { light: '#feb940', dark: '#2e99c8' },
      errorCorrectionLevel: 'L',
    });
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default generateQr;
