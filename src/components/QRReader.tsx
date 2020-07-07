import React from 'react';
import QrReader from 'react-qr-reader';

class QRReader extends React.Component {
  handleScan = (data: string) => {
    console.log(data);
  };

  handleError = (err: string) => {
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
