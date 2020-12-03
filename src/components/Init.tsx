import React from 'react';
import { Subscription } from 'rxjs';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import generateCode from '../utils/generate-code';
import enterCode from '../utils/enter-code';
import listenConnection from '../utils/listen-connection';
import InputBox from './InputBox';
import QR from './QR';
import QRReader from './QRReader';
import CopyText from './CopyText';
import { Connector, Connected, CodePinPair } from '../types';
import listenConnectionDone from '../utils/listen-connection-done';
import Pin from './Pin';
import codePinManager from '../utils/code-pin-manager';

type InitState = {
  generatedCode: number;
  enteredCode?: number;
  connector: Connector;
  readQR: boolean;
  buttonDisabled: boolean;
  showPinModal: boolean;
  enteredPin: number;
  codePin: CodePinPair;
};
type InitProps = {
  onConnected?: (data: Connected) => void;
};

class Init extends React.Component<InitProps, InitState> {
  private listenConnectionSub: Subscription = null;

  private onPinEnteredEventName = 'onPinEntered';
  private onPinEnteredEvent = new Event(this.onPinEnteredEventName);

  constructor(props: InitProps) {
    super(props);
    this.state = {
      connector: null,
      enteredCode: null,
      generatedCode: null,
      readQR: false,
      buttonDisabled: true,
      showPinModal: false,
      enteredPin: null,
      codePin: codePinManager.getCodePin(),
    };
  }

  async componentDidMount() {
    const { code, connector } = await generateCode();
    this.setState({
      generatedCode: code,
      connector,
    });

    // If user has session, use code and pin from session
    // No need to 'listenConnection' in case of successful login
    const { codePin } = this.state;
    if (codePin) {
      this.setState({
        enteredCode: codePin.code,
        enteredPin: codePin.pin,
        codePin: null,
      });
      this.enterCode();
      return;
    }

    this.startListenConnection(connector);
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
    codePinManager.setCodePin(data.code, data.pin);
    onConnected(data);
  };

  handlePinRequired = async () => this.askForPin();

  askForPin = async () => {
    this.setState({ showPinModal: true });

    let listener;
    await new Promise((res) => {
      listener = res;
      window.addEventListener(this.onPinEnteredEventName, listener);
    });
    window.removeEventListener(this.onPinEnteredEventName, listener);

    const { enteredPin } = this.state;
    return enteredPin;
  };

  enterCode = async () => {
    const { enteredCode, connector, enteredPin } = this.state;
    if (!enteredCode || enteredCode.toString().length !== 6) {
      return;
    }

    let updatedConnector: Connector;
    try {
      updatedConnector = await enterCode(
        enteredCode,
        connector,
        enteredPin ? () => Promise.resolve(enteredPin) : this.handlePinRequired
      );
    } catch (e) {
      this.handleEnterCodeError(e, connector);
      return;
    }

    // Let listenConnection complete the connection when user enter own code.
    const isSelfConnection =
      connector.connection.id ===
      (updatedConnector && updatedConnector.connection.id);

    this.enterCodeSuccess(updatedConnector, isSelfConnection);
  };

  handleEnterCodeError = (e: Error, connector: Connector) => {
    console.error(
      'Error occured while enterCode(), session might be expired',
      e
    );
    codePinManager.clearCodePin();
    this.setState({ enteredCode: null, enteredPin: null });
    this.startListenConnection(connector);
  };

  codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= 6) {
      this.setState({
        enteredCode: parseInt(val, 10),
        buttonDisabled: val.length !== 6,
      });
    }
  };

  enterPin = (pin: number) => {
    this.setState({ showPinModal: false, enteredPin: pin });
    window.dispatchEvent(this.onPinEnteredEvent);
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

  enterCodeSuccess = (
    updatedConnector: Connector,
    isSelfConnection: boolean
  ) => {
    if (updatedConnector && !isSelfConnection) {
      this.setState({ connector: updatedConnector });
      const { enteredPin } = this.state;
      this.onConnected(enteredPin);
    }
  };

  startListenConnection = (connector: Connector) => {
    this.unsubscribeListenConnection();
    const { connection } = connector;
    this.listenConnectionSub = listenConnection(connection.id).subscribe(
      async () => {
        const { pin } = await listenConnectionDone(connection, connector);
        this.onConnected(pin.value);
      }
    );
  };

  render() {
    const {
      generatedCode,
      readQR,
      buttonDisabled,
      enteredCode,
      showPinModal,
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
                variant="warning"
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
        <Pin
          show={showPinModal}
          enterPin={this.enterPin}
          onHide={() => this.setState({ showPinModal: false })}
        />
      </>
    );
  }
}

export default Init;
