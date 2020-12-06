import React from 'react';
import CopyToClipboard from 'copy-to-clipboard';
import { BsReplyFill } from 'react-icons/bs';
import { Button, Modal } from 'react-bootstrap';

type ShareButtonProps = {
  className?: string;
  code: number;
  pin?: number;
};
type ShareButtonState = {
  showCopiedText: boolean;
};

class ShareButton extends React.Component<ShareButtonProps, ShareButtonState> {
  constructor(props: ShareButtonProps) {
    super(props);
    this.state = {
      showCopiedText: false,
    };
  }

  onClick = () => {
    const { code, pin } = this.props;
    const pinQuery = pin ? `&pin=${pin}` : '';
    const url = `${window.location.origin}/?code=${code}${pinQuery}`;
    CopyToClipboard(url);
    this.setState({ showCopiedText: true });
    setTimeout(() => {
      this.setState({ showCopiedText: false });
    }, 500);
  };

  render() {
    const { showCopiedText } = this.state;
    const { className } = this.props;
    return (
      <>
        <Modal
          show={showCopiedText}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>Link Coppied</Modal.Body>
        </Modal>
        <Button
          className={className || 'btn-block'}
          variant="warning"
          onClick={this.onClick}
        >
          <BsReplyFill style={{ width: '30px', height: '30px' }} />
        </Button>
      </>
    );
  }
}

export default ShareButton;
