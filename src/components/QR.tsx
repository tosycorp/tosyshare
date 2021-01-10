import React from 'react';
import { Image, Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Routes } from '../types';
import generateQR from '../utils/generate-qr';
import redirect from '../utils/redirect';

type QRState = {
  dataURL: string;
  largeDataURL: string;
};
interface QRProps extends RouteComponentProps {
  text: string;
  showModal?: boolean;
  onQRClick?: () => void;
}

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

  onClose = () => {
    redirect(this, Routes.INIT);
  };

  render() {
    const { dataURL, largeDataURL } = this.state;
    const { showModal, onQRClick } = this.props;
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
          onHide={this.onClose}
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

export default withRouter(QR);
