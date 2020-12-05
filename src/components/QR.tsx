import React from 'react';
import { Image } from 'react-bootstrap';
import generateQR from '../utils/generate-qr';

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

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(previousProps: QRProps) {
    this.setData(previousProps);
  }

  setData = async (previousProps?: QRProps) => {
    const { text } = this.props;
    if (!text || (previousProps && previousProps.text === text)) {
      return;
    }
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ dataURL: await generateQR(text) });
  };

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
