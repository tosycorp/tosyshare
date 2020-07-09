import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

type InputBoxProps = {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  buttonText: string;
  inputValue?: string;
  inputType?: string;
  buttonDisabled?: boolean;
};

class InputBox extends React.Component<InputBoxProps> {
  constructor(props: InputBoxProps) {
    super(props);
    this.state = { ...this.state };
  }

  render() {
    const {
      changeHandler,
      clickHandler,
      buttonText,
      inputValue,
      inputType,
      buttonDisabled,
    } = this.props;
    return (
      <>
        <InputGroup className="mb-3">
          <FormControl
            style={{ borderColor: '#007bff' }}
            size="lg"
            placeholder="Enter Code"
            aria-label="Enter Code"
            aria-describedby="basic-addon2"
            onChange={changeHandler}
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
