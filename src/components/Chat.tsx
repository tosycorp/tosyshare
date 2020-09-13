import React from 'react';
import { Row, Col, Alert, Container, Image } from 'react-bootstrap';
import { listenMessages } from '../utils/listen-messages';
import saveMessage from '../utils/save-message';
import InputBox, { UploadOptions } from './InputBox';
import CopyText from './CopyText';
import generateColor from '../utils/generate-color';
import { Message, Connected } from '../types';

type JSONMessage = {
  url: string;
  fileName: string;
  type: string;
};

type ChatState = {
  message: string;
  messageType: 'STRING' | 'JSON';
  messages: Message[];
  chatMaxHeight: string;
};
type ChatProps = {
  connected: Connected;
};

class Chat extends React.Component<ChatProps, ChatState> {
  private messagesEndRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: ChatProps) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      messageType: 'STRING',
      chatMaxHeight: 'calc(100vh - 130px)',
    };
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

  messageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputHeight: number
  ) => {
    this.setState({ chatMaxHeight: `calc(100vh - ${inputHeight + 82}px)` });
    const message = e.target.value;
    if (message !== '\n') {
      this.setState({ message, messageType: 'STRING' });
    }
  };

  send = () => {
    const { message, messageType } = this.state;
    if (message && message !== '\n') {
      const { connected } = this.props;
      saveMessage(message, connected, messageType);
      this.setState({ message: '' });
    }
  };

  isLastMessage = (messages: Message[], index: number) => {
    return messages.length - 1 === index;
  };

  prepareLinkMessage = (obj: JSONMessage) => (
    <a target="_blank" rel="noopener noreferrer" href={obj.url}>
      {obj.fileName}
    </a>
  );

  prepareMessage = (
    m: Message,
    ref: React.RefObject<HTMLDivElement>,
    index: number
  ) => {
    type returnObjectType = {
      className: string;
      val: JSX.Element | string;
    };
    const returnObject: returnObjectType = {
      className: '',
      val: m.value,
    };

    if (m.type === 'JSON') {
      const obj = JSON.parse(m.value);
      returnObject.className = 'text-center';
      returnObject.val = obj.type.toLowerCase().includes('image') ? (
        <Image style={{ width: '300px' }} alt="Message" src={obj.url} />
      ) : (
        <a target="_blank" rel="noopener noreferrer" href={obj.url}>
          {obj.fileName}
        </a>
      );
    }

    return (
      <Alert
        className={returnObject.className}
        ref={ref}
        key={`alert_${index}`}
        style={{ overflowWrap: 'break-word' }}
        variant={generateColor(m.connector.id)}
      >
        {returnObject.val}
      </Alert>
    );
  };

  public render() {
    const { messages, message, chatMaxHeight } = this.state;
    const { connected } = this.props;
    const { code, connectorId } = connected;

    const uploadHandler: (obj: { file: File; key: string }) => void = (val) => {
      const { file, key } = val;
      const messageS: JSONMessage = {
        url: `https://tosyshare33f3b4cb0e3045bba147150ad29e916a214301-dev.s3-eu-west-1.amazonaws.com/public/${key}`,
        fileName: file.name,
        type: file.type,
      };
      this.setState({
        message: JSON.stringify(messageS),
        messageType: 'JSON',
      });
      this.send();
    };

    const uploadOptions: UploadOptions = {
      uploadHandler,
      connected,
    };
    return (
      <>
        <Row style={{ maxHeight: chatMaxHeight, overflowY: 'auto' }}>
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
                  {this.prepareMessage(
                    m,
                    messages.length - 1 === index ? this.messagesEndRef : null,
                    index
                  )}
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
                uploadOptions={uploadOptions}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Chat;
