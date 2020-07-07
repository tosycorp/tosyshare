import React from 'react';
import { Image } from 'react-bootstrap';
import generateQR from '../utils/qr-genarator';

type QRState = {
  dataURL: string;
};
type QRProps = {
  text: string;
};

class QR extends React.Component<QRProps, QRState> {
  constructor(props: QRProps) {
    super(props);
    this.state = { dataURL: null };
  }

  async componentDidMount() {
    const { text } = this.props;
    this.setState({ dataURL: await generateQR(text) });
  }

  render() {
    const { dataURL } = this.state;
    return dataURL ? <Image alt="QR Code" src={dataURL} /> : null;
  }
}

export default QR;
