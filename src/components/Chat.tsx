import React from 'react';
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
  };

  public render() {
    const { messages } = this.state;
    const { connected } = this.props;
    return (
      <div>
        <h1>Chat Started</h1>
        <span>ConnectionId: {connected.connectionId}</span>
        <br />
        <span>ConnectorId: {connected.connectorId}</span>

        <h2>Messages</h2>
        {messages?.map((m, index) => (
          <div key={index}>
            <br />
            <span>
              {m.value} ({m.connector.id})
            </span>
          </div>
        ))}

        <br />

        <input onChange={this.messageChange} />
        <button type="button" onClick={this.send}>
          SEND
        </button>
      </div>
    );
  }
}

export default Chat;
