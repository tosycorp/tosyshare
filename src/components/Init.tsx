import React from 'react';
import { generateCode, Connector, Connection } from '../utils/code-genarator';
import { enterCode } from '../utils/enter-code';
import { listenConnection } from '../utils/listen-connection';

import { ZenObservable } from 'zen-observable-ts';

export interface Connected {
  connectionId: string;
  connectorId: string;
}

type InitState = {
  generatedCode: number;
  enteredCode?: number;
  connector: Connector;
  connection: Connection;
};
type InitProps = {
  onConnected?: (data: Connected) => void;
};

class Init extends React.Component<InitProps, InitState> {
  private listenConnectionSub: ZenObservable.Subscription = null;

  constructor(props: InitProps) {
    super(props);
    this.state = { ...this.state };
  }

  public async componentDidMount() {
    const { code, connection, connector } = await generateCode();
    this.setState({ ...this.state, connection, generatedCode: code, connector });

    this.listenConnectionSub = listenConnection(connection.id)
      .subscribe(() => {
        this.unsubscribeListenConnection();
        this.onConnected();
      });
  }

  private async enterCode() {
    if (!this.state.enteredCode || this.state.enteredCode.toString().length !== 6) {
      return;
    }
    const connector = await enterCode(this.state.enteredCode, this.state.connector);
    if (connector) {
      this.setState({ ...this.state, connector });

      this.unsubscribeListenConnection();
      this.onConnected();
    }
  }

  private onConnected() {
    const data = { connectionId: this.state.connector.connection.id, connectorId: this.state.connector.id };
    this.props.onConnected(data);
  }

  private unsubscribeListenConnection() {
    if (this.listenConnectionSub && !this.listenConnectionSub.closed) {
      this.listenConnectionSub.unsubscribe();
    }
  }

  private codeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const code = parseInt(e.target.value);
    if (!isNaN(code)) {
      this.setState({ ...this.state, enteredCode: code });
    }
  }

  public render() {
    return (
      <div>
        <h1>Generated Code: {this.state.generatedCode}</h1>
        <h1>Enter Code: </h1><input onChange={this.codeChange.bind(this)}></input><button onClick={this.enterCode.bind(this)}>JOIN</button>
      </div>
    );
  }
}

export default Init;
