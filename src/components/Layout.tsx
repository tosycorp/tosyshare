import React from 'react';
import { generateCode, Connector, Connection } from '../utils/code-genarator';
import { enterCode } from '../utils/enter-code';
import { listenConnection } from '../utils/listen-connection';

import { ZenObservable } from 'zen-observable-ts';

type LayoutState = {
  generatedCode: number;
  enteredCode?: number;
  connector: Connector;
  connection: Connection;
  found: boolean;
};
type LayoutProps = {};

class Layout extends React.Component<LayoutProps, LayoutState> {
  listenConnectionSub: ZenObservable.Subscription = null;

  constructor(props: LayoutProps) {
    super(props);
    this.state = { ...this.state };
  }

  async componentDidMount() {
    const { code, connection, connector } = await generateCode();
    this.setState({ ...this.state, connection, generatedCode: code, connector });

    this.listenConnectionSub = listenConnection(connection.id)
      .subscribe(() => {
        const newState = { ...this.state, found: true };
        this.setState(newState);

        this.unSubscribeListerConnection();

        // TODO: NAVIGATE TO CHAT PAGE
        console.log('Connection found. Navigate to chat. State: ', this.state);
      });
  }

  async enterCode() {
    if (!this.state.enteredCode || this.state.enteredCode.toString().length !== 6) {
      return;
    }
    const connector = await enterCode(this.state.enteredCode, this.state.connector);
    if (connector) {
      const newState = { ...this.state, connector, found: true };
      this.setState(newState);

      this.unSubscribeListerConnection();

      // TODO: NAVIGATE TO CHAT PAGE
      console.log('Connection found. Navigate to chat. State: ', this.state);
    }
  }

  private unSubscribeListerConnection() {
    if (this.listenConnectionSub && !this.listenConnectionSub.closed) {
      this.listenConnectionSub.unsubscribe();
    }
  }

  codeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const code = parseInt(e.target.value);
    if (!isNaN(code)) {
      const newState = { ...this.state, enteredCode: code };
      this.setState(newState);
    }
  }

  render() {
    return (
      <div>
        <h1>Generated Code: {this.state.generatedCode}</h1>
        <h1>Enter Code: </h1><input onChange={this.codeChange.bind(this)}></input><button onClick={this.enterCode.bind(this)}>JOIN</button>
        {this.state.found ? <h1>Connection Found! ConnectionId: {this.state.connector.connection.id}</h1> : null}
      </div>
    );
  }
}

export default Layout;
