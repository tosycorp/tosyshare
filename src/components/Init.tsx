import React from 'react';
import { Subscription } from 'rxjs';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { BsCameraVideoFill } from 'react-icons/bs';
import generateCode from '../utils/generate-code';
import enterCode from '../utils/enter-code';
import listenConnection from '../utils/listen-connection';
import QR from './QR';
import QRReader from './QRReader';
import { Connector, Connected } from '../types';
import listenConnectionDone from '../utils/listen-connection-done';
import Pin from './Pin';
import sessionManager from '../utils/session-manager';
import ShareButton from './ShareButton';
import getConnectionByCode from '../utils/get-connection-by-code';
import saveConnector from '../utils/save-connector';
import EnterDigits from './EnterDigits';

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
    this.state = this.prepareInitState();
  }

  async componentDidMount() {
    // Bypass code generation if code already defined.
    const { enteredCode, connector } = this.state;
    if (enteredCode) {
      // Create new connector if not defined.
      // Use case: when user uses predefined URL to join.
      if (!connector) {
        // Validate if there is valid connection for entered code.
        const connection = await getConnectionByCode(enteredCode);
        if (!connection) {
          this.handleError(
            new Error(`No connection found for code: ${enterCode}`)
          );
          return;
        }

        this.setState({ connector: await saveConnector(connection.id) });
      }

      this.enterCode(true, true);
      return;
    }

    await this.executeGenerateCode();
    this.startListenConnection();
  }

  prepareInitState = (): InitState => {
    // Check if code and pin are on url.
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const urlCode = parseInt(params.get('code'), 10);
    const urlPin = parseInt(params.get('pin'), 10);
    // If data is received, clean up the url.
    if (urlCode || urlPin) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    // Check if user have active session.
    const { code, pin, connectorId } = sessionManager.getSessionValues() || {};
    const connector = connectorId && this.generateConnectorById(connectorId);

    return {
      connector: connector || null,
      enteredCode: urlCode || code || null,
      generatedCode: null,
      readQR: false,
      buttonDisabled: true,
      showPinModal: false,
      enteredPin: urlPin || pin || null,
    };
  };

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

  enterCode = async (ignoreSelfConnection = false, refreshOnError = false) => {
    const { enteredCode, connector, enteredPin } = this.state;
    if (!enteredCode || enteredCode.toString().length !== 6) {
      return;
    }

    let updatedConnector: Connector;
    let pin: number;
    try {
      ({ updatedConnector, pin } = await enterCode(
        enteredCode,
        connector.id,
        enteredPin ? () => Promise.resolve(enteredPin) : this.handlePinRequired
      ));
    } catch (e) {
      this.handleError(
        e,
        'Error occured while enterCode(), session might be expired',
        refreshOnError
      );
      return;
    }

    // Let listenConnection complete the connection when user enter own code.
    const isSelfConnection =
      (connector.connection && connector.connection.id) ===
      (updatedConnector && updatedConnector.connection.id);

    if (updatedConnector && (ignoreSelfConnection || !isSelfConnection)) {
      this.setState({ connector: updatedConnector });
      this.onConnected(pin);
    }
  };

  handleError = (error?: Error, log?: string, refresh = false) => {
    console.error(error, log);
    if (refresh) {
      sessionManager.clearSessionValues();
      this.setState({ enteredCode: null, enteredPin: null });
      this.componentDidMount();
    }
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
        const { pin } = await listenConnectionDone(connection);
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
                  <Col
                    className="text-center align-self-center w-75"
                    xl={5}
                    md={5}
                    sm={5}
                    xs={5}
                  >
                    {generatedCode ? (
                      <ShareButton
                        className="btn-block init-share-code-button"
                        code={generatedCode}
                        showCodeOnButton
                      />
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
                    <b>Option 1:</b> Use camera to scan &apos;QR Code&apos;
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xl={5} md={5} sm={5} xs={5}>
                    <Button
                      className="btn-block init-camera-button"
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
                <Row
                  className="justify-content-center"
                  style={{ marginBottom: '-5px', marginTop: '5px' }}
                >
                  <Col className="text-center align-self-center w-75" md={8}>
                    <div className="divider" />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col className="text-center align-self-center w-75" md={8}>
                    <b>Option 2:</b> Enter 6-digit code manually
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xl={7} md={7} sm={7} xs={7}>
                    <EnterDigits
                      changeHandler={this.codeChange}
                      clickHandler={() => this.enterCode()}
                      buttonDisabled={buttonDisabled}
                      inputValue={enteredCode && enteredCode.toString()}
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
