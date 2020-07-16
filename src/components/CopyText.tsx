import React from 'react';
import CopyToClipboard from 'copy-to-clipboard';

type CopyTextProps = {
  text: string;
  copiedText?: string;
};
type CopyTextState = {
  showCopiedText: boolean;
};

class CopyText extends React.Component<CopyTextProps, CopyTextState> {
  private timer: NodeJS.Timeout;

  constructor(props: CopyTextProps) {
    super(props);
    this.state = {
      showCopiedText: false,
    };
  }

  onTextClick = () => {
    const { text } = this.props;
    CopyToClipboard(text);
    this.setState({ showCopiedText: true });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ showCopiedText: false });
    }, 500);
  };

  render() {
    const { copiedText, text } = this.props;
    const { showCopiedText } = this.state;
    return (
      <b onClick={this.onTextClick} role="presentation">
        {showCopiedText ? copiedText || 'Copied!' : text}
      </b>
    );
  }
}

export default CopyText;
