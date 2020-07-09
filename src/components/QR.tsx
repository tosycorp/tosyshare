import React from 'react';
import { Image } from 'react-bootstrap';
import generateQR from '../utils/qr-genarator';

type QRState = {
  dataURL: string;
};
type QRProps = {
  text: string;
};

const defaultImageSrc = 'default-qr.png';

class QR extends React.Component<QRProps, QRState> {
  constructor(props: QRProps) {
    super(props);
    this.state = { dataURL: null };
  }

  async componentDidUpdate(previousProps: QRProps) {
    const { text } = this.props;
    if (text && previousProps.text !== text) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ dataURL: await generateQR(text) });
    }
  }

  render() {
    const { dataURL } = this.state;
    const opacity = dataURL ? 1 : 0.5;
    return (
      <Image
        alt="QR Code"
        src={dataURL || defaultImageSrc}
        style={{ opacity }}
      />
    );
  }
}

export default QR;
