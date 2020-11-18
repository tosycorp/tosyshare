import React from 'react';
import { Subscription } from 'rxjs';
import { Row, Col, Button, Spinner, Modal } from 'react-bootstrap';
import generateCode from '../utils/generate-code';
import { enterCode, enterPin } from '../utils/enter-code';
import listenConnection from '../utils/listen-connection';
import InputBox from './InputBox';
import QR from './QR';
import QRReader from './QRReader';
import CopyText from './CopyText';
import { Connector, Connected, Connection } from '../types';
import listenConnectionDone from '../utils/listen-connection-done';

type InitState = {
  generatedCode: number;
  enteredCode?: number;
  connector: Connector;
  readQR: boolean;
  buttonDisabled: boolean;
  hasPin: boolean;
  enteredPin: number;
  connection: Connection;
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
      buttonDisabled: true,
      hasPin: false,
      enteredPin: null,
      connection: null,
    };
  }

  async componentDidMount() {
    const { code, connector, connection } = await generateCode();
    this.setState({
      generatedCode: code,
      connector,
    });

    this.listenConnectionSub = listenConnection(connection.id).subscribe(
      async () => {
        const { pin } = await listenConnectionDone(connection, connector);
        this.onConnected(pin.value);
      }
    );
  }

  onConnected = async (pin?: number) => {
    this.unsubscribeListenConnection();

    const { connector } = this.state;
    const connectorId = connector.id;
    const data = {
      connectionId: connector.connection.id,
      connectorId,
      code: connector.connection.code,
      pin,
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
      if (updatedConnector.connector) {
        this.setState({
          hasPin: true,
          connector: updatedConnector.connector,
          connection: updatedConnector.connection,
        });
      } else {
        this.setState({ connector: updatedConnector });
        this.onConnected();
      }
    }
  };

  codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      this.setState({ enteredCode: null });
    } else {
      const code = parseInt(e.target.value, 10);
      if (!Number.isNaN(code)) {
        if (val.length <= 6) {
          this.setState({
            enteredCode: code,
            buttonDisabled: val.length !== 6,
          });
        }
      }
    }
  };

  enterPin = async () => {
    const { enteredPin, connector, connection } = this.state;
    if (!enteredPin || enteredPin.toString().length !== 4) {
      return;
    }
    const updatedConnector = await enterPin(connector, connection, enteredPin);
    if (updatedConnector) {
      this.setState({ hasPin: false, connector: updatedConnector });
      this.onConnected(enteredPin);
    }
  };

  pinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      this.setState({ enteredCode: null });
    } else {
      const pin = parseInt(e.target.value, 10);
      if (!Number.isNaN(pin)) {
        if (val.length <= 4) {
          this.setState({
            enteredPin: pin,
          });
        }
      }
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

  onQRRead = (code: number) => {
    this.setState({ enteredCode: code });
    this.enterCode();
  };

  render() {
    const {
      generatedCode,
      readQR,
      buttonDisabled,
      enteredCode,
      hasPin,
      enteredPin,
    } = this.state;
    return (
      <>
        {!readQR && (
          <>
            <Row className="justify-content-center">
              <Col className="text-center align-self-center" md={8}>
                <QR text={generatedCode ? generatedCode.toString() : null} />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="text-center align-self-center">or use</Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="text-center align-self-center">
                {generatedCode ? (
                  <h3>
                    <CopyText text={generatedCode.toString()} />
                  </h3>
                ) : (
                  <Spinner animation="border" />
                )}
              </Col>
            </Row>
          </>
        )}
        <Row className="justify-content-center mt-3">
          <Col
            className="justify-content-center text-center align-self-center"
            style={{ display: 'flex' }}
            xl={6}
            md={8}
            sm={9}
            xs={10}
          >
            {readQR ? (
              <QRReader onRead={this.onQRRead} />
            ) : (
              <Button
                className="btn-block"
                variant="outline-primary"
                size="lg"
                onClick={this.onQRCodeReadClick}
              >
                Scan QR Code
              </Button>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col xl={6} md={8} sm={9} xs={10}>
            <InputBox
              changeHandler={this.codeChange}
              clickHandler={this.enterCode}
              inputPlaceholder="Enter Code"
              buttonText="JOIN"
              inputType="number"
              buttonDisabled={buttonDisabled}
              inputValue={enteredCode && enteredCode.toString()}
            />
          </Col>
        </Row>
        <Modal
          show={hasPin}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <InputBox
              changeHandler={this.pinChange}
              clickHandler={this.enterPin}
              inputPlaceholder="Enter Pin"
              buttonText="JOIN"
              inputType="number"
              inputValue={enteredPin && enteredPin.toString()}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Init;
