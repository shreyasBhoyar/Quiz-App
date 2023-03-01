import React, { useEffect, useState } from "react";
import { Col, Row, Form, InputGroup, Button } from "react-bootstrap";

const CreateQuizQuestion = (props) => {
  const [question, setQuestion] = useState( {
    title: "",
    options : [
      {
        value : "",
        isCorrect : false
      },  {
        value : "",
        isCorrect : false
      },  {
        value : "",
        isCorrect : false
      },  {
        value : "",
        isCorrect : false
      }
    ],points : "5"
  });

  useEffect(()=>{
    setQuestion({...props.defaultData})
  },[])

  const handleChange = (event) => {
    if(event.target.id.split("-")[0]==="points"){
      let temp = { ...question };
      temp.points = event.target.value;
      setQuestion(temp);
    }
    else if(event.target.id.split("-")[2]==="title"){
      let temp = { ...question };
      temp.title = event.target.value;
      setQuestion(temp);
    }else if(event.target.id.split("-")[0]==="optionVal"){
      let temp = { ...question };
      temp.options[event.target.id.split("-")[1]].value = event.target.value;
      setQuestion(temp);
    }else{
      let temp = { ...question };
      temp.options[event.target.id.split("-")[1]].isCorrect = event.target.checked;
      setQuestion(temp);
    }

    
  };
  return (
    <div className="question" id={props.uniqueId}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Question
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            placeholder="Enter question"
            id={`question-${props.uniqueId}-title`}
            required
            value={question.title}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Options
        </Form.Label>
        <Col sm={10}>
          {question &&
            question.options.map((option,index) => {
              return(
              <InputGroup className="mb-3" key={index}>
                <InputGroup.Checkbox
                  aria-label="Checkbox for following text input"
                  id={`option-${index}-${props.uniqueId}`}
                  checked={option.isCorrect}
                  onChange={handleChange}
                />
                <Form.Control
                  aria-label={`Option ${index+1}`}
                  placeholder={`Option ${index+1}`}
                  id={`optionVal-${index}-${props.uniqueId}`}
                  required
                  value={option.value}
                  onChange={handleChange}
                />
              </InputGroup>
              )
            })}

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
            value={question.points}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">Default marks are 5</Form.Text>
        </Col>
        <Col>
          <Button
            className="float-end"
            variant="danger"
            id={props.uniqueId}
            onClick={props.cancel}
          >
            Delete
          </Button>
        </Col>
      </Form.Group>
    </div>
  );
};

export default CreateQuizQuestion;
