import React from 'react';
import autosize from 'autosize';
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
  private stepInput: React.RefObject<HTMLTextAreaElement>;
  constructor(props: InputBoxProps) {
    super(props);
    this.stepInput = React.createRef();
  }

  componentDidMount() {
    autosize(this.stepInput.current);
  }

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
            ref={this.stepInput}
            style={{
              borderColor: '#007bff',
              maxHeight: '100px',
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
