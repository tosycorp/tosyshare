import React from 'react';
import { Subscription } from 'rxjs';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { generateCode, Connector } from '../utils/code-genarator';
import enterCode from '../utils/enter-code';
import listenConnection from '../utils/listen-connection';
import InputBox from './InputBox';
import QR from './QR';
import LabelGroup from './LabelGroup';
import QRReader from './QRReader';

export interface Connected {
  connectionId: string;
  connectorId: string;
}

type InitState = {
  generatedCode: number;
  enteredCode?: number;
  connector: Connector;
  readQR: boolean;
};
type InitProps = {
  onConnected?: (data: Connected) => void;
};

class Init extends React.Component<InitProps, InitState> {
  private listenConnectionSub: Subscription = null;

  constructor(props: InitProps) {
    super(props);
    this.state = {
      connector: null,
      enteredCode: null,
      generatedCode: null,
      readQR: false,
    };
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

  onQRCodeReadClick = () => {
    this.setState({ readQR: true });
  };

  public render() {
    const { generatedCode, readQR } = this.state;
    return (
      <>
        <Row className="justify-content-center">
          <Col className="text-center align-self-center" md={6}>
            {generatedCode ? (
              <QR text={generatedCode.toString()} />
            ) : (
              <Spinner animation="border" />
            )}
          </Col>
          <Col
            className="justify-content-center text-center align-self-center"
            style={{ display: 'flex' }}
            md={6}
          >
            {readQR ? (
              <QRReader />
            ) : (
              <Button variant="link" size="lg" onClick={this.onQRCodeReadClick}>
                Read QR Code
              </Button>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <LabelGroup
              firstLabel="Generated Code:"
              secondLabel={generatedCode ? generatedCode.toString() : null}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <InputBox
              changeHandler={this.codeChange}
              clickHandler={this.enterCode}
              buttonText="JOIN"
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Init;
