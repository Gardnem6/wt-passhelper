import React from "react";
import { Form } from "react-bootstrap";
import { setNumberInput } from "../helpers/setNumberInput";

interface Props {
  callback: React.Dispatch<React.SetStateAction<number>>;
  label: string;
  value: string;
}

function NumberInput(props: Props) {

  return (
    <Form.Group>
      <Form.Label className="text-light">{props.label}</Form.Label>
      <Form.Control
        type="number"
        step={1}
        value={props.value}
        onChange={(e) => setNumberInput(props.callback, e.target.value)}
      />
    </Form.Group>
  );
}

export default NumberInput;
