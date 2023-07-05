import { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";

interface Props {
  className?: string;
  pClassName?: string;
  title: string;
}

function NumberDisplayCard({
  className = "h-100",
  pClassName = "h3",
  title,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Card className={className}>
      <Card.Header>{title}</Card.Header>
      <Card.Body className="d-flex justify-content-center align-items-center">
        <p className={pClassName}>{props.children}</p>
      </Card.Body>
    </Card>
  );
}

export default NumberDisplayCard;
