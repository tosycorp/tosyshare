import React from 'react';
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Alert,
  Form,
} from 'react-bootstrap';
import { listenMessages } from '../utils/listen-messages';
import { Message, saveMessage } from '../utils/save-message';
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
          <Col md={8}>
            <Alert variant="dark">Chat Started</Alert>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Form.Group as={Row}>
              <Form.Label column="lg" md={3}>
                ConnectionId:
              </Form.Label>
              <Form.Label column="lg" md={9}>
                {connected.connectionId}
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Form.Group as={Row}>
              <Form.Label column="lg" md={3}>
                ConnectorId:
              </Form.Label>
              <Form.Label column="lg" md={9}>
                {connected.connectorId}
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Alert variant="dark">Messages</Alert>
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
            <Col md={6}>
              <Alert key={index} variant="primary">
                <p>
                  {m.value} ({m.connector.id})
                </p>
              </Alert>
            </Col>
          </Row>
        ))}
        <Row className="justify-content-md-center">
          <Col md={8}>
            <InputGroup className="mb-3">
              <FormControl
                size="lg"
                as="textarea"
                aria-describedby="basic-addon2"
                value={message}
                onChange={this.messageChange}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.send}>
                  SEND
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default Chat;
