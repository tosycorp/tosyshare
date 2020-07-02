import React from 'react';
import { ZenObservable } from 'zen-observable-ts';
import { generateCode, Connector } from '../utils/code-genarator';
import { enterCode } from '../utils/enter-code';
import { listenConnection } from '../utils/listen-connection';

export interface Connected {
  connectionId: string;
  connectorId: string;
}

type InitState = {
  generatedCode: number;
  enteredCode?: number;
  connector: Connector;
};
type InitProps = {
  onConnected?: (data: Connected) => void;
};

class Init extends React.Component<InitProps, InitState> {
  private listenConnectionSub: ZenObservable.Subscription = null;

  constructor(props: InitProps) {
    super(props);
    this.state = { connector: null, enteredCode: null, generatedCode: null };
  }

  async componentDidMount() {
    const { code, connector, connection } = await generateCode();
    this.setState({
      generatedCode: code,
      connector,
    });

    this.listenConnectionSub = listenConnection(connection.id).subscribe(() => {
      this.unsubscribeListenConnection();
      this.onConnected();
    });
  }

  onConnected = () => {
    const { connector } = this.state;
    const data = {
      connectionId: connector.connection.id,
      connectorId: connector.id,
    };
    const { onConnected } = this.props;
    onConnected(data);
  };

  enterCode = async () => {
    const { enteredCode, connector } = this.state;
    if (!enteredCode || enteredCode.toString().length !== 6) {
      return;
    }
    const updatedConnector = await enterCode(enteredCode, connector);
    if (updatedConnector) {
      this.setState({ connector: updatedConnector });

      this.unsubscribeListenConnection();
      this.onConnected();
    }
  };

  codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = parseInt(e.target.value, 10);
    if (!Number.isNaN(code)) {
      this.setState({ enteredCode: code });
    }
  };

  unsubscribeListenConnection = () => {
    if (this.listenConnectionSub && !this.listenConnectionSub.closed) {
      this.listenConnectionSub.unsubscribe();
    }
  };

  public render() {
    const { generatedCode } = this.state;
    return (
      <div>
        <h1>Generated Code: {generatedCode}</h1>
        <h1>Enter Code: </h1>
        <input onChange={this.codeChange} />
        <button type="button" onClick={this.enterCode}>
          JOIN
        </button>
      </div>
    );
  }
}

export default Init;
