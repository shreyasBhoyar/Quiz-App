import React from 'react';
import Card from 'react-bootstrap/Card';

const QuizCorrectAnswer= ({ correctAns,totalQuestions}) => {

  return (
    <Card bg="white"  style={{ width: '16rem',border:'1.5px solid green'}} className="mb-2">
      <Card.Body>
        <Card.Title> Correct: </Card.Title>
        <Card.Text>
            {correctAns}/{totalQuestions} 
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default QuizCorrectAnswer;