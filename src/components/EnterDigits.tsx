import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { BsPlug } from 'react-icons/bs';

type EnterDigitsProps = {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  inputValue?: string;
  buttonDisabled?: boolean;
  stopAutoFocus?: boolean;
};

type EnterDigitsState = {};

class EnterDigits extends React.Component<EnterDigitsProps, EnterDigitsState> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: EnterDigitsProps) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const { stopAutoFocus } = this.props;
    if (!stopAutoFocus) {
      this.input.current.focus();
    }
  }

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const { clickHandler } = this.props;
      clickHandler();
    }
  };

  render() {
    const { changeHandler } = this.props;
    const { clickHandler, inputValue, buttonDisabled } = this.props;
    return (
      <InputGroup className="mb-2">
        <FormControl
          as="input"
          ref={this.input}
          style={{
            borderColor: '#e0a800',
            height: 'calc(1em + 1rem + 2px)',
            padding: '.35rem .5rem',
          }}
          size="lg"
          autoFocus
          placeholder="6-digit code"
          aria-describedby="basic-addon2"
          onChange={changeHandler}
          onKeyDown={this.handleInputKeyDown}
          value={inputValue || ''}
          type="tel"
          pattern="[0-9]{6,6}"
          inputMode="tel"
        />
        <InputGroup.Append>
          <Button
            variant="warning"
            onClick={clickHandler}
            disabled={buttonDisabled}
          >
            <BsPlug style={{ width: '20px', height: '20px' }} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default EnterDigits;
