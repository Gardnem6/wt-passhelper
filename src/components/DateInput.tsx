import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  callback: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  value: string;
}

function DateInput(props: Props) {

  return (
    <Form.Group>
      <Form.Label className="text-light">{props.label}</Form.Label>
      <Form.Control
        type="date"
        value={props.value}
        onChange={(e) => props.callback(e.target.value)}
      />
    </Form.Group>
  );
}

export default DateInput;
