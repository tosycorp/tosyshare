import React from 'react';
import QrReader from 'react-qr-reader';

type QRReaderProps = {
  onRead: (data: number) => void;
};
class QRReader extends React.Component<QRReaderProps, {}> {
  handleScan = (data: string) => {
    const { onRead } = this.props;
    if (data) {
      const dataAsNumber = parseInt(data, 10);
      if (!Number.isNaN(dataAsNumber)) {
        onRead(dataAsNumber);
      }
    }
  };

  handleError = (err: string) => {
    console.error('Error while scanning QR code', err);
  };

  render() {
    return (
      <QrReader
        style={{ width: '100%' }}
        delay={300}
        onError={this.handleError}
        onScan={this.handleScan}
      />
    );
  }
}

export default QRReader;
