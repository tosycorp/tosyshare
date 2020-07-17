import React from 'react';
import CopyToClipboard from 'copy-to-clipboard';

type CopyTextProps = {
  text: string;
};
type CopyTextState = {
  showCopiedText: boolean;
};

class CopyText extends React.Component<CopyTextProps, CopyTextState> {
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
    setTimeout(() => {
      this.setState({ showCopiedText: false });
    }, 500);
  };

  render() {
    const { text } = this.props;
    const { showCopiedText } = this.state;
    return (
      <b onClick={this.onTextClick} role="presentation">
        {showCopiedText ? 'Copied!' : text}
      </b>
    );
  }
}

export default CopyText;
