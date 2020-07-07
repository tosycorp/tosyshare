import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

type InputBoxProps = {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  buttonText: string;
  inputValue?: string;
};

const InputBox = (props: InputBoxProps) => {
  const { changeHandler, clickHandler, buttonText, inputValue } = props;
  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          size="lg"
          placeholder="Enter Code"
          aria-label="Enter Code"
          aria-describedby="basic-addon2"
          onChange={changeHandler}
          value={inputValue}
        />
        <InputGroup.Append>
          <Button variant="primary" onClick={clickHandler}>
            {buttonText}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

export default InputBox;
