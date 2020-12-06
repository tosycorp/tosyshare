import React from 'react';
import { Image, Modal } from 'react-bootstrap';
import generateQR from '../utils/generate-qr';

type QRState = {
  dataURL: string;
  largeDataURL: string;
  showModal: boolean;
};
type QRProps = {
  text: string;
};

const defaultImageSrc = 'default-qr.png';

class QR extends React.Component<QRProps, QRState> {
  constructor(props: QRProps) {
    super(props);
    this.state = { dataURL: null, largeDataURL: null, showModal: false };
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

    const largeDataWidth = Math.min(300, window.innerWidth * 0.6);
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      dataURL: await generateQR(text, 120),
      largeDataURL: await generateQR(text, largeDataWidth, true),
    });
  };

  render() {
    const { dataURL, largeDataURL, showModal } = this.state;
    const opacity = dataURL ? 1 : 0.5;
    return (
      <>
        {!showModal && (
          <Image
            alt="QR Code"
            src={dataURL || defaultImageSrc}
            style={{ opacity }}
            onClick={() => this.setState({ showModal: true })}
          />
        )}
        <Modal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
          aria-labelledby="contained-modal-title-vcenter"
          backdropClassName="qr-modal-backdrop"
          centered
        >
          <Modal.Body>
            <div className="text-center align-self-center">
              <Image alt="QR Code" src={largeDataURL || defaultImageSrc} />
            </div>
            <div className="text-center align-self-center">
              <b>Let participant scan QR code above</b>
            </div>
            <div className="text-center align-self-center">
              <i>click anywhere to hide</i>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default QR;
