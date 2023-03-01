import React from 'react';
import Card from 'react-bootstrap/Card';
import AnimationBar from './ResultAnimationBar';

const QuizResultCard = ({ userName, score, totalQuestions }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <Card bg="light" text="black" style={{ width: '34rem' }} className="mb-2">
      <Card.Body>
        <Card.Title style={{ fontSize:'25px' }}>Congratulations! Your Score is {score}/{totalQuestions} .</Card.Title>
        <Card.Text>
          <br/>
          <AnimationBar now={percentage} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default QuizResultCard;