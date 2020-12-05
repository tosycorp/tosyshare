import QRCode from 'qrcode';

const generateQr = (text: string, width: number, blackAndWhite = false) => {
  try {
    let color;
    if (!blackAndWhite) {
      color = { light: '#feb940', dark: '#1e6382' };
    }
    return QRCode.toDataURL(text, {
      width,
      margin: 1,
      color,
      errorCorrectionLevel: 'L',
    });
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default generateQr;
