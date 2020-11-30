import React from 'react';
import { FormControl, InputGroup, Button, ProgressBar } from 'react-bootstrap';
import Upload from './Upload';
import { Connected } from '../types';

export type UploadOptions = {
  uploadHandler: (obj: { file: File; key: string }) => void;
  connected: Connected;
};

type InputBoxProps = {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  buttonText: string;
  inputValue?: string;
  inputType?: string;
  buttonDisabled?: boolean;
  inputPlaceholder?: string;
  uploadOptions?: UploadOptions;
};

type InputBoxState = {
  uploadProgress: number;
};

class InputBox extends React.Component<InputBoxProps, InputBoxState> {
  private input: React.RefObject<HTMLTextAreaElement> = React.createRef();

  constructor(props: InputBoxProps) {
    super(props);
    this.state = {
      uploadProgress: null,
    };
  }

  componentDidUpdate() {
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

  uploadProgressHandler: (progress: number) => void = (val) => {
    this.setState({
      uploadProgress: val,
    });
  };

  render() {
    const { changeHandler } = this.props;
    const { uploadProgress } = this.state;
    const {
      clickHandler,
      buttonText,
      inputValue,
      inputType,
      inputPlaceholder,
      buttonDisabled,
      uploadOptions,
    } = this.props;
    return (
      <>
        {uploadProgress && <ProgressBar now={uploadProgress} />}
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
            {uploadOptions && (
              <Upload
                connected={uploadOptions.connected}
                onUploadDone={uploadOptions.uploadHandler}
                onUploadProgress={this.uploadProgressHandler}
              />
            )}
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
