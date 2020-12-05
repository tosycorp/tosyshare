import React from 'react';
import { Subscription } from 'rxjs';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { BsCameraVideoFill } from 'react-icons/bs';
import generateCode from '../utils/generate-code';
import enterCode from '../utils/enter-code';
import listenConnection from '../utils/listen-connection';
import InputBox from './InputBox';
import QR from './QR';
import QRReader from './QRReader';
import CopyText from './CopyText';
import { Connector, Connected } from '../types';
import listenConnectionDone from '../utils/listen-connection-done';
import Pin from './Pin';
import sessionManager from '../utils/session-manager';

type InitState = {
  generatedCode: number;
  enteredCode?: number;
  connector: Connector;
  readQR: boolean;
  buttonDisabled: boolean;
  showPinModal: boolean;
  enteredPin: number;
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
    const { code, pin, connectorId } = sessionManager.getSessionValues() || {};
    const connector = connectorId && this.generateConnectorById(connectorId);

    this.state = {
      connector: connector || null,
      enteredCode: code || null,
      generatedCode: null,
      readQR: false,
      buttonDisabled: true,
      showPinModal: false,
      enteredPin: pin || null,
    };
  }

  async componentDidMount() {
    // Bypass code generation and connection listening if code and pin already defined.
    const { enteredCode, enteredPin, connector } = this.state;
    if (enteredCode && enteredPin) {
      // Generate code and connector if not available yet.
      // Use case: when user uses predefined URL to join.
      if (!connector) await this.executeGenerateCode();

      this.enterCode(true);
      return;
    }

    await this.executeGenerateCode();
    this.startListenConnection();
  }

  executeGenerateCode = async () => {
    const { code, connector } = await generateCode();
    this.setState({
      generatedCode: code,
      connector,
    });
  };

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
    sessionManager.setSessionValues(data.code, data.pin, connectorId);
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

  enterCode = async (ignoreSelfConnection = false) => {
    const { enteredCode, connector, enteredPin } = this.state;
    if (!enteredCode || enteredCode.toString().length !== 6) {
      return;
    }

    let updatedConnector: Connector;
    try {
      updatedConnector = await enterCode(
        enteredCode,
        connector.id,
        enteredPin ? () => Promise.resolve(enteredPin) : this.handlePinRequired
      );
    } catch (e) {
      this.handleEnterCodeError(e);
      return;
    }

    // Let listenConnection complete the connection when user enter own code.
    const isSelfConnection =
      (connector.connection && connector.connection.id) ===
      (updatedConnector && updatedConnector.connection.id);

    if (updatedConnector && (ignoreSelfConnection || !isSelfConnection)) {
      this.setState({ connector: updatedConnector });
      this.onConnected(enteredPin);
    }
  };

  handleEnterCodeError = (e: Error) => {
    console.error(
      'Error occured while enterCode(), session might be expired',
      e
    );
    sessionManager.clearSessionValues();
    this.setState({ enteredCode: null, enteredPin: null });
    this.componentDidMount();
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

  generateConnectorById = (id: string): Connector => ({
    id,
    identityId: null,
    createdAt: null,
    updatedAt: null,
    expDate: null,
  });

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

  startListenConnection = () => {
    this.unsubscribeListenConnection();
    const { connector } = this.state;
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
        {readQR && (
          <>
            <Row className="justify-content-center mt-3">
              <Col xl={6} md={8} sm={9} xs={10}>
                <QRReader onRead={this.onQRRead} />
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col xl={6} md={8} sm={9} xs={10}>
                <Button
                  variant="danger"
                  className="btn-block"
                  size="lg"
                  onClick={() => this.setState({ readQR: false })}
                >
                  Back
                </Button>
              </Col>
            </Row>
          </>
        )}
        {!readQR && (
          <>
            <Row className="flex-column sketchy init-row init-first-row">
              <Row className="justify-content-center init-header-text-row">
                <b>Want to be a host?</b>
              </Row>
              <Row className="justify-content-center flex-column flex-grow-1">
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center w-75" md={8}>
                    <b>Option 1:</b> Share &apos;QR Code&apos; with participants
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center" md={8}>
                    <QR
                      text={generatedCode ? generatedCode.toString() : null}
                    />
                  </Col>
                </Row>
                <Row
                  className="justify-content-center"
                  style={{ marginTop: '-10px', marginBottom: '-5px' }}
                >
                  <Col className="text-center align-self-center w-75" md={8}>
                    <i>click to enlarge &apos;QR Code&apos;</i>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center w-75" md={8}>
                    <div className="divider" />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center w-75" md={8}>
                    <b>Option 2:</b> Share 6-digit code with participants
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center">
                    {generatedCode ? (
                      <h4>
                        <CopyText text={generatedCode.toString()} />
                      </h4>
                    ) : (
                      <Spinner animation="border" />
                    )}
                  </Col>
                </Row>
              </Row>
            </Row>
            <Row className="justify-content-center flex-column sketchy init-row">
              <Row className="justify-content-center init-header-text-row">
                <b>Want to connect to a host?</b>
              </Row>
              <Row className="justify-content-center flex-column flex-grow-1">
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center w-75" md={8}>
                    <b>Option 1:</b> Use camera and scan &apos;QR Code&apos;
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xl={5} md={5} sm={5} xs={5}>
                    <Button
                      className="btn-block"
                      variant="warning"
                      size="lg"
                      onClick={this.onQRCodeReadClick}
                    >
                      <BsCameraVideoFill
                        style={{ width: '30px', height: '30px' }}
                      />
                    </Button>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center w-75" md={8}>
                    <div
                      className="divider div-transparent"
                      style={{ marginTop: '5px' }}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center w-75" md={8}>
                    <b>Option 2:</b> Enter 6-digit code manually
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xl={7} md={7} sm={7} xs={7}>
                    <InputBox
                      changeHandler={this.codeChange}
                      clickHandler={() => this.enterCode()}
                      showPlugIcon
                      inputType="number"
                      buttonDisabled={buttonDisabled}
                      inputValue={enteredCode && enteredCode.toString()}
                      stopAutoFocus={readQR}
                    />
                  </Col>
                </Row>
              </Row>
            </Row>
          </>
        )}
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
