import React from 'react';
import { Form, Row, Spinner } from 'react-bootstrap';

type LabelGroupProps = {
  firstLabel: string;
  secondLabel: string;
};

const LabelGroup = (props: LabelGroupProps) => {
  const { firstLabel, secondLabel } = props;
  return (
    <>
      <Form.Group as={Row}>
        <Form.Label className="text-center" column="lg" md={6} sm={6}>
          {firstLabel}
        </Form.Label>
        {secondLabel ? (
          <Form.Label className="text-center" column="lg" md={6} sm={6}>
            {secondLabel}
          </Form.Label>
        ) : (
          <Spinner animation="border" />
        )}
      </Form.Group>
    </>
  );
};

export default LabelGroup;
