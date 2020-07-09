import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { listenMessages } from '../utils/listen-messages';
import { Message, saveMessage } from '../utils/save-message';
import InputBox from './InputBox';
import { Connected } from './Init';

type ChatState = {
  message: string;
  messages: Message[];
};
type ChatProps = {
  connected: Connected;
};

class Chat extends React.Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = { message: '', messages: [] };
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

  public render() {
    const { messages, message } = this.state;
    const { connected } = this.props;
    return (
      <>
        <Row className="justify-content-md-center">
          <Col className="text-center">
            <Alert variant="dark">Chat Started</Alert>
          </Col>
        </Row>
        {messages?.map((m, index) => (
          <Row
            className={
              connected.connectorId === m.connector.id
                ? 'justify-content-md-end'
                : 'justify-content-md-start'
            }
          >
            <Col md={9}>
              <Alert
                style={{ overflowWrap: 'break-word' }}
                key={index}
                variant={
                  connected.connectorId === m.connector.id
                    ? 'primary'
                    : 'secondary'
                }
              >
                <p>{m.value}</p>
              </Alert>
            </Col>
          </Row>
        ))}
        <Row className="justify-content-md-center">
          <Col>
            <InputBox
              changeHandler={this.messageChange}
              clickHandler={this.send}
              buttonText="SEND"
              inputValue={message}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Chat;
