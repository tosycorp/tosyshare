import React from 'react';
import { Row, Col, Alert, Container } from 'react-bootstrap';
import { listenMessages } from '../utils/listen-messages';
import { Message, saveMessage } from '../utils/save-message';
import InputBox from './InputBox';
import { Connected } from './Init';
import getColor from '../utils/color-generator';

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
    const { code, connectorId } = connected;
    return (
      <>
        <Row className="justify-content-center">
          <Col className="text-center">
            <Alert variant="dark">Chat Started (Code: {code})</Alert>
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
                style={{ overflowWrap: 'break-word' }}
                key={`alert_${index}`}
                variant={getColor(m.connector.id)}
              >
                <p>{m.value}</p>
              </Alert>
            </Col>
          </Row>
        ))}
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
