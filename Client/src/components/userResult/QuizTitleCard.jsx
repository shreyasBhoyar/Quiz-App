import Card from 'react-bootstrap/Card';

const QuizTitleCard = ({ quizTitle , quizDescription}) => {
  return (
    <>
      {[
        'White',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'black'}
          style={{ width: '36rem', border:'none' }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title style={{ fontSize:'23px',textAlign:'center' }}> Here is your quiz result for <strong>{quizTitle.toUpperCase()}</strong>. </Card.Title>
            {/* <Card.Text style={{ fontSize:'25px' }}>
              Description: {quizDescription}
            </Card.Text> */}
          </Card.Body>
        </Card>
      ))}   
    </>
  );
}

export default QuizTitleCard;