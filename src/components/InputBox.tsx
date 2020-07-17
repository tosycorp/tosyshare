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
  private input: React.RefObject<HTMLTextAreaElement> = React.createRef();

  componentDidUpdate() {
    this.input.current.focus();
    this.input.current.style.height = '0';
    this.input.current.style.height = `${
      this.input.current.scrollHeight + 2
    }px`;
    this.input.current.scrollTop = this.input.current.scrollHeight;
  }

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
            as="textarea"
            ref={this.input}
            style={{
              borderColor: '#007bff',
              maxHeight: '108px',
              resize: 'none',
            }}
            size="lg"
            autoFocus
            placeholder={inputPlaceholder || ''}
            aria-describedby="basic-addon2"
            onChange={changeHandler}
            onKeyDown={this.handleInputKeyDown}
            value={inputValue || ''}
            type={inputType || 'text'}
            rows={1}
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
