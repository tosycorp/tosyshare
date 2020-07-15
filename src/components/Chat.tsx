import React from 'react';
import { Row, Col, Alert, Container } from 'react-bootstrap';
import CopyToClipboard from 'copy-to-clipboard';
import { listenMessages } from '../utils/listen-messages';
import { Message, saveMessage } from '../utils/save-message';
import InputBox from './InputBox';
import { Connected } from './Init';
import getColor from '../utils/color-generator';

type ChatState = {
  message: string;
  messages: Message[];
  showCopiedText: boolean;
};
type ChatProps = {
  connected: Connected;
};

class Chat extends React.Component<ChatProps, ChatState> {
  private timer: NodeJS.Timeout;
  constructor(props: ChatProps) {
    super(props);
    this.state = { message: '', messages: [], showCopiedText: false };
  }

  public async componentDidMount() {
    const { connected } = this.props;
    listenMessages(connected.connectionId).subscribe((m: Message) => {
      let { messages } = this.state;
      messages = [...messages, m];
      this.setState({ messages });
    });
  }

  messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: e.target.value });
  };

  send = () => {
    const { message } = this.state;
    const { connected } = this.props;
    saveMessage(message, connected);
    this.setState({ message: '' });
  };

  onCodeClick = () => {
    const { connected } = this.props;
    CopyToClipboard(connected.code.toString());
    this.setState({ showCopiedText: true });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ showCopiedText: false });
    }, 500);
  };

  public render() {
    const { messages, message, showCopiedText } = this.state;
    const { connected } = this.props;
    const { code, connectorId } = connected;
    return (
      <>
        <Row style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <Col>
            <Row className="justify-content-center">
              <Col className="text-center">
                <Alert variant="dark">
                  Chat Started (Code:{' '}
                  <b onClick={this.onCodeClick} role="presentation">
                    {showCopiedText ? 'Copied!' : code}
                  </b>
                  )
                </Alert>
              </Col>
            </Row>
            {messages?.map((m, index) => (
              <Row
                key={`row_${index}`}
                className={
                  connectorId === m.connector.id
                    ? 'justify-content-end'
                    : 'justify-content-start'
                }
              >
                <Col key={`col_${index}`} md={9} sm={9} xs={9}>
                  <Alert
                    key={`alert_${index}`}
                    style={{ overflowWrap: 'break-word' }}
                    variant={getColor(m.connector.id)}
                  >
                    {m.value}
                  </Alert>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <Container className="fixed-bottom">
          <Row className="justify-content-center">
            <Col md={8}>
              <InputBox
                changeHandler={this.messageChange}
                clickHandler={this.send}
                buttonText="SEND"
                inputValue={message}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Chat;
