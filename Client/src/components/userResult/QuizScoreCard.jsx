import React from 'react';
import Card from 'react-bootstrap/Card';

const QuizScoreCard= ({ score,totalScore}) => {

  return (
    <Card bg="white"  style={{ width: '10rem',border:'1.5px solid black'}} className="mb-2">
      <Card.Body>
        <Card.Title> Score: </Card.Title>
        <Card.Text>
            {score}/{totalScore} 
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default QuizScoreCard;