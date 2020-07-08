import React from 'react';
import QrReader from 'react-qr-reader';

type QRReaderProps = {
  onRead: (data: number) => void;
};
class QRReader extends React.Component<QRReaderProps, {}> {
  handleScan = (data: string) => {
    // eslint-disable-next-line no-console
    console.log(data);

    const { onRead } = this.props;
    if (data) {
      const dataAsNumber = parseInt(data, 10);
      if (!Number.isNaN(dataAsNumber)) {
        onRead(dataAsNumber);
      }
    }
  };

  handleError = (err: string) => {
    // eslint-disable-next-line no-console
    console.log(err);
  };

  render() {
    return (
      <QrReader
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        className="justify-content-md-center"
        delay={300}
        onError={this.handleError}
        onScan={this.handleScan}
      />
    );
  }
}

export default QRReader;
