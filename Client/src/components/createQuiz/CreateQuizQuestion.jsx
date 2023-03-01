import React from "react";
import { Col, Row, Form, InputGroup, Button } from "react-bootstrap";


const CreateQuizQuestion = (props) => {

  return (
    <div className="createQuestion" id={props.uniqueId}>
   {/* <Button id={props.uniqueId} onClick={props.cancel} ><BsFillTrashFill /></Button> */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Question
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            placeholder="Enter question"
            id={`question-${props.uniqueId}`}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Options
        </Form.Label>
        <Col sm={10}>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              id={`option1-${props.uniqueId}`}
            />
            <Form.Control
              aria-label="Option 1"
              placeholder="Option 1"
              id={`option1Val-${props.uniqueId}`}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              id={`option2-${props.uniqueId}`}
            />
            <Form.Control
              aria-label="Option 2"
              placeholder="Option 2"
              id={`option2Val-${props.uniqueId}`}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              id={`option3-${props.uniqueId}`}
            />
            <Form.Control
              aria-label="Option 3"
              placeholder="Option 3"
              id={`option3Val-${props.uniqueId}`}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              id={`option4-${props.uniqueId}`}
            />
            <Form.Control
              aria-label="Option 4"
              placeholder="Option 4"
              id={`option4Val-${props.uniqueId}`}
              required
            />
          </InputGroup>
          <small className="text-muted">
            You can select multiple correct options
          </small>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Points
        </Form.Label>
        <Col sm={2}>
          <Form.Control
            type="number"
            placeholder="5"
            id={`points-${props.uniqueId}`}
          />
          <Form.Text className="text-muted">Default marks are 5</Form.Text>
        </Col>
        <Col>
          <Button className="float-end" variant="danger" id={props.uniqueId} onClick={props.cancel} >Delete</Button>
        </Col>
      </Form.Group>
      
    </div>
  );
};

export default CreateQuizQuestion;
