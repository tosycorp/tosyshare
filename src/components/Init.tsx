import React from 'react';
import { Subscription } from 'rxjs';
import {
  Row,
  Col,
  FormControl,
  InputGroup,
  Button,
  Form,
} from 'react-bootstrap';
import { generateCode, Connector } from '../utils/code-genarator';
import enterCode from '../utils/enter-code';
import listenConnection from '../utils/listen-connection';

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
  private listenConnectionSub: Subscription = null;

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
      <>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column="lg" md={6}>
                Generated Code:
              </Form.Label>
              <Form.Label column="lg" md={6}>
                {generatedCode}
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <InputGroup className="mb-3">
              <FormControl
                size="lg"
                placeholder="Enter Code"
                aria-label="Enter Code"
                aria-describedby="basic-addon2"
                onChange={this.codeChange}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.enterCode}>
                  JOIN
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default Init;
