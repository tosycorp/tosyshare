import React from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import InputBox from './InputBox';

type PinState = {
  enteredPin: number;
  buttonDisabled: boolean;
};
interface PinProps extends RouteComponentProps {
  onHide: () => void;
  enterPin: (data: number) => void;
}

class Pin extends React.Component<PinProps, PinState> {
  constructor(props: PinProps) {
    super(props);
    this.state = {
      enteredPin: null,
      buttonDisabled: true,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    history.push('/pin');
  }

  componentDidUpdate() {
    window.onpopstate = () => {
      this.onHide();
    };
  }

  enterPin = () => {
    const { enteredPin } = this.state;
    const { enterPin } = this.props;
    enterPin(enteredPin);
  };

  onHide = () => {
    this.setState({ enteredPin: null });
    const { onHide } = this.props;
    onHide();
  };

  pinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= 4) {
      this.setState({
        enteredPin: parseInt(val, 10),
        buttonDisabled: val.length !== 4,
      });
    }
  };

  render() {
    const { enteredPin, buttonDisabled } = this.state;
    return (
      <Modal
        show
        animation={false}
        onHide={this.onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Pin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputBox
            changeHandler={this.pinChange}
            clickHandler={this.enterPin}
            buttonText="JOIN"
            inputType="number"
            buttonDisabled={buttonDisabled}
            inputValue={enteredPin && enteredPin.toString()}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(Pin);
