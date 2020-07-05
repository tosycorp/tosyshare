import React from 'react';
import generateQR from '../utils/qr-genarator';

type QRState = {
  dataURL: string;
};
type QRProps = {
  text: string;
};

class QR extends React.Component<QRProps, QRState> {
  private img: React.RefObject<HTMLImageElement>;

  constructor(props: QRProps) {
    super(props);
    this.state = { dataURL: null };
    this.img = React.createRef<HTMLImageElement>();
  }

  async componentDidMount() {
    const { text } = this.props;
    this.setState({ dataURL: await generateQR(text) });
  }

  render() {
    const { dataURL } = this.state;
    return dataURL ? <img ref={this.img} alt="QR Code" src={dataURL} /> : null;
  }
}

export default QR;
