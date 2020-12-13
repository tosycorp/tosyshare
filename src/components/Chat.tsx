import React from 'react';
import FileSaver from 'file-saver';
import { Row, Col, Alert, Image, Button } from 'react-bootstrap';
import { Subscription } from 'rxjs';
import { listenMessages, stopListenMessages } from '../utils/listen-messages';
import saveMessage from '../utils/save-message';
import InputBox, { UploadOptions } from './InputBox';
import CopyText from './CopyText';
import generateColor from '../utils/generate-color';
import { Message, Connected, JSONMessage, MessageType } from '../types';
import env, { Env } from '../utils/env';
import getMessagesByConnectionId from '../utils/get-messages-by-connectionId';
import sessionManager from '../utils/session-manager';
import ShareButton from './ShareButton';
import { setGeneratedPin } from '../utils/listen-pin';

type ChatState = {
  message: string;
  messageType: MessageType;
  messages: Message[];
  pin?: number;
};
type ChatProps = {
  connected: Connected;
  onOut: () => void;
};

class Chat extends React.Component<ChatProps, ChatState> {
  private listenMessageSub: Subscription = null;
  private messagesEndRef: React.RefObject<HTMLDivElement> = React.createRef();
  private s3Prefix =
    env === Env.dev
      ? 'https://tosyshare33f3b4cb0e3045bba147150ad29e916a214301-dev.s3-eu-west-1.amazonaws.com/public'
      : 'https://tosyshare33f3b4cb0e3045bba147150ad29e916a102521-prod.s3.eu-west-1.amazonaws.com/public';

  constructor(props: ChatProps) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      messageType: MessageType.STRING,
    };
  }

  async componentDidMount() {
    const { connected } = this.props;
    const { pin, connectionId } = connected;

    if (pin) {
      // Set pin if connector is host or entered pin on connecting
      this.setPin(pin);
    } else {
      // Set the pin when host generates the pin, if connector is participant
      setGeneratedPin(this.setPin);
    }

    this.listenMessageSub = listenMessages(connectionId).subscribe(
      (m: Message) => {
        const { messages } = this.state;
        this.setState({ messages: [...messages, m] });
      }
    );

    this.setPastMessages(connected.connectionId);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.unsubscribeListenMessage();
  }

  async setPastMessages(connectionId: string) {
    const pastMessages = await getMessagesByConnectionId(connectionId);
    const { messages } = this.state;
    this.setState({ messages: [...pastMessages, ...messages] });
  }

  setPin = (pin: number) => {
    sessionManager.setSessionPinValue(pin);
    this.setState({ pin });
  };

  unsubscribeListenMessage = () => {
    stopListenMessages();
    if (this.listenMessageSub && !this.listenMessageSub.closed) {
      this.listenMessageSub.unsubscribe();
    }
  };

  scrollToBottom = () => {
    if (this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView();
    }
  };

  messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;
    if (message !== '\n') {
      this.setState({ message, messageType: MessageType.STRING });
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

  prepareMessage = (
    m: Message,
    ref: React.RefObject<HTMLDivElement>,
    index: number
  ) => {
    let val: JSX.Element;

    if (m.type === MessageType.JSON) {
      const obj = JSON.parse(m.value) as JSONMessage;
      val = (
        <Button
          variant="link"
          onClick={() => FileSaver.saveAs(obj.url, obj.fileName)}
        >
          {obj.type.toLowerCase().includes('image') ? (
            <Image
              style={{ maxWidth: '100%' }}
              alt="Message"
              src={obj.url}
              onLoad={this.scrollToBottom}
            />
          ) : (
            obj.fileName
          )}
        </Button>
      );
    }

    return (
      <Alert
        className={m.type === MessageType.JSON ? 'text-center' : ''}
        ref={ref}
        key={`alert_${index}`}
        style={{ overflowWrap: 'break-word' }}
        variant={generateColor(m.messageConnectorId)}
      >
        {val || m.value}
      </Alert>
    );
  };

  private uploadHandler: (obj: { file: File; key: string }) => void = (val) => {
    const { file, key } = val;
    const messageS: JSONMessage = {
      url: `${this.s3Prefix}/${key}`,
      fileName: file.name,
      type: file.type,
    };
    this.setState({
      message: JSON.stringify(messageS),
      messageType: MessageType.JSON,
    });
    this.send();
  };

  render = () => {
    const { messages, message, pin } = this.state;
    const { connected, onOut } = this.props;
    const { code, connectorId } = connected;
    const { uploadHandler } = this;

    const uploadOptions: UploadOptions = {
      uploadHandler,
      connected,
    };

    return (
      <>
        <Alert
          style={{ height: '34px', lineHeight: '31px', padding: '0px 10px' }}
          className="text-center"
          variant="dark"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div
                style={{ display: 'table', height: '100%', overflow: 'hidden' }}
              >
                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                  Code: <CopyText text={code.toString()} />{' '}
                  {pin && (
                    <>
                      Pin: <CopyText text={pin.toString()} />
                    </>
                  )}
                </div>
              </div>
            </div>
            <ShareButton className="p-0 m-0 btn-sm" code={code} pin={pin} />
            <Button
              variant="danger"
              className="float-right btn-sm"
              onClick={() => {
                sessionManager.clearSessionValues();
                onOut();
              }}
            >
              Out
            </Button>
          </div>
        </Alert>

        <Row className="no-scroll flex-col flex-full">
          <Col className="auto-scroll flex-full">
            {messages?.map((m, index) => (
              <Row
                key={`row_${index}`}
                className={
                  connectorId === m.messageConnectorId
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
        <InputBox
          changeHandler={this.messageChange}
          clickHandler={this.send}
          buttonText="SEND"
          inputValue={message}
          uploadOptions={uploadOptions}
        />
      </>
    );
  };
}

export default Chat;
