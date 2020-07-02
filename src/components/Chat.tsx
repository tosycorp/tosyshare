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
    this.state = { ...this.state, messages: [] };
  }

  public async componentDidMount() {
    listenMessages(this.props.connected.connectionId)
      .subscribe((m: Message) => this.setState({ ...this.state, messages: [...this.state.messages, m] }));
  }

  private messageChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, message: e.target.value });
  }

  private send() {
    saveMessage(this.state.message, this.props.connected);
  }

  public render() {
    return (
      <div>
        <h1>Chat Started</h1>
        <span>
          ConnectionId: {this.props.connected.connectionId}
        </span>
        <br></br>
        <span>
          ConnectorId: {this.props.connected.connectorId}
        </span>

        <h2>Messages</h2>
        {this.state.messages?.map((m) => <div><br></br><span>{m.value} ({m.connector.id})</span></div>)}

        <br></br>

        <input onChange={this.messageChange.bind(this)}></input><button onClick={this.send.bind(this)}>SEND</button>
      </div>
    );
  }
}

export default Chat;
