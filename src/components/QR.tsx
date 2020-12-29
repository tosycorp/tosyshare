import React from 'react';
import { Image, Modal } from 'react-bootstrap';
import generateQR from '../utils/generate-qr';

type QRState = {
  dataURL: string;
  largeDataURL: string;
};
type QRProps = {
  text: string;
  showModal?: boolean;
  onQRClick?: () => void;
  onQRModalClose?: () => void;
};

const defaultImageSrc = 'default-qr.png';

class QR extends React.Component<QRProps, QRState> {
  constructor(props: QRProps) {
    super(props);
    this.state = { dataURL: null, largeDataURL: null };
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
    const { dataURL, largeDataURL } = this.state;
    const { showModal, onQRClick, onQRModalClose } = this.props;
    const opacity = dataURL ? 1 : 0.5;
    return (
      <>
        {!showModal && (
          <Image
            alt="QR Code"
            src={dataURL || defaultImageSrc}
            style={{ opacity }}
            onClick={onQRClick}
          />
        )}
        <Modal
          show={showModal}
          onHide={onQRModalClose}
          aria-labelledby="contained-modal-title-vcenter"
          backdropClassName="qr-modal-backdrop"
          centered
        >
          <Modal.Body>
            <div className="text-center align-self-center">
              <Image alt="QR Code" src={largeDataURL || defaultImageSrc} />
            </div>
            <div className="text-center align-self-center">
              <b>Let participant scan &apos;QR Code&apos; above</b>
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
