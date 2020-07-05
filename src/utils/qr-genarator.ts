import QRCode from 'qrcode';

export default async (text: string) => {
  try {
    return await QRCode.toDataURL(text, { scale: 10 });
  } catch (err) {
    console.error(err);
  }
  return null;
};
