import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

type InputBoxProps = {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  buttonText: string;
  inputValue?: string;
  inputType?: string;
  buttonDisabled?: boolean;
  inputPlaceholder?: string;
};

class InputBox extends React.Component<InputBoxProps> {
  constructor(props: InputBoxProps) {
    super(props);
    this.state = { ...this.state };
  }

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const { clickHandler } = this.props;
      clickHandler();
    }
  };

  render() {
    const {
      changeHandler,
      clickHandler,
      buttonText,
      inputValue,
      inputType,
      inputPlaceholder,
      buttonDisabled,
    } = this.props;
    return (
      <>
        <InputGroup className="mb-3">
          <FormControl
            style={{ borderColor: '#007bff' }}
            size="lg"
            placeholder={inputPlaceholder || ''}
            aria-describedby="basic-addon2"
            onChange={changeHandler}
            onKeyDown={this.handleInputKeyDown}
            value={inputValue || ''}
            type={inputType || 'text'}
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              onClick={clickHandler}
              disabled={buttonDisabled}
            >
              {buttonText}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </>
    );
  }
}

export default InputBox;
