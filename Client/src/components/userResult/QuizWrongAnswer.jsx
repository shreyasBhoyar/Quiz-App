import React from 'react';
import Card from 'react-bootstrap/Card';

const QuizWrongAnswer= ({ wrongAns,totalQuestions}) => {

  return (
    <Card bg="white"  style={{ width: '16rem',border:'1.5px solid red'}} className="mb-2">
      <Card.Body>
        <Card.Title><h6> Incorrect/<br />Unanswered: </h6></Card.Title>
        <Card.Text>
            {wrongAns}/{totalQuestions} 
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default QuizWrongAnswer;