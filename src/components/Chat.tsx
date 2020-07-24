import React from 'react';
import { Row, Col, Alert, Container } from 'react-bootstrap';
import { listenMessages } from '../utils/listen-messages';
import saveMessage from '../utils/save-message';
import InputBox from './InputBox';
import CopyText from './CopyText';
import generateColor from '../utils/generate-color';
import { Message, Connected } from '../types';

type ChatState = {
  message: string;
  messages: Message[];
};
type ChatProps = {
  connected: Connected;
};

class Chat extends React.Component<ChatProps, ChatState> {
  private messagesEndRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: ChatProps) {
    super(props);
    this.state = { message: '', messages: [] };
  }

  async componentDidMount() {
    const { connected } = this.props;
    listenMessages(connected.connectionId).subscribe((m: Message) => {
      const { messages } = this.state;
      this.setState({ messages: [...messages, m] });
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;
    if (message !== '\n') {
      this.setState({ message });
    }
  };

  send = () => {
    const { message } = this.state;
    if (message && message !== '\n') {
      const { connected } = this.props;
      saveMessage(message, connected);
      this.setState({ message: '' });
    }
  };

  isLastMessage = (messages: Message[], index: number) => {
    return messages.length - 1 === index;
  };

  public render() {
    const { messages, message } = this.state;
    const { connected } = this.props;
    const { code, connectorId } = connected;
    return (
      <>
        <Row style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <Col>
            <Row className="justify-content-center">
              <Col className="text-center">
                <Alert variant="dark">
                  Chat Started (Code: <CopyText text={code.toString()} />)
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
                    ref={
                      this.isLastMessage(messages, index)
                        ? this.messagesEndRef
                        : null
                    }
                    key={`alert_${index}`}
                    style={{ overflowWrap: 'break-word' }}
                    variant={generateColor(m.connector.id)}
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
