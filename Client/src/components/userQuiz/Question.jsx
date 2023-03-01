import { useEffect, useState } from "react";
import { Form, Button, Stack, Col, Row } from "react-bootstrap";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Question = (props) => {
  let params = useParams();
  let navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false)
  const [nextSubmit, setNextSubmit] = useState("Next");
  const [questions, setQuestions] = useState([...props.quizData.questions]);
  const [windowUrl, setWindowUrl] = useState()

  useEffect(() => {
    setWindowUrl(window.location.href)
    console.log(windowUrl)
    if (questions.length === 1) {
      setNextSubmit("Submit")
    }
  }, [windowUrl])

  const previousBtn = () => {
    setNextSubmit("Next");
    setQuestionNumber(questionNumber - 1);
    if (questionNumber === 1) {
      setShowPrevious(false);
    }
  }

  const nextBtn = () => {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
    }
    if (questionNumber === questions.length - 2) {
      setNextSubmit("Submit");
    }
    if (questionNumber >= 0) {
      setShowPrevious(true);
    }
  };

  const questionCall = (questionNo) => {
    setQuestionNumber(questionNo);
    if (questionNo === 0) {
      setShowPrevious(false);
    }
    if (questionNo > 0) {
      setShowPrevious(true);
    }
    if (questionNo === questions.length - 1) {
      setNextSubmit("Submit");
    } else {
      setNextSubmit("Next");
    }
  };

  const handleChange = (event) => {
    let question = questions[questionNumber];
    const option = question.options.find(
      (option) =>
        event.target.value === option.value && event.target.id === option._id
    );
    if (event.target.type === "radio") {
      if (event.target.checked) {
        if (option) {
          option.isSubmitted = true;
        }

        question.options.forEach((option) => {
          if (option.value !== event.target.value) {
            option.isSubmitted = false;
          }
        });
      }
    } else {
      if (event.target.checked) {
        if (option) {
          option.isSubmitted = true;
        }
      } else {
        option.isSubmitted = false;
      }
    }

    setQuestions([
      ...questions.slice(0, questionNumber),
      question,
      ...questions.slice(questionNumber + 1),
    ]);
  };

  const clearMyChoice = () => {
    const question = questions[questionNumber];
    question.options.forEach((option) => {
      option.isSubmitted = false;
    });
    setQuestions([
      ...questions.slice(0, questionNumber),
      question,
      ...questions.slice(questionNumber + 1),
    ]);
  };

  const numberOfUnattemptedQuestions=()=>{
    let unattemptedQuestion=0;
    
    questions.forEach((question)=>{
      let flag=0;
      question.options.forEach((option)=>{
        if(option.isSubmitted===true){
          flag=1;
          return;
        }
      })
      if(flag===0){
        unattemptedQuestion=unattemptedQuestion+1;
      }
    })
    return unattemptedQuestion;
  };

  const submitQuiz = () => {
    let unattemptedQuestion=numberOfUnattemptedQuestions();
    let outputText=""
    if(unattemptedQuestion===0){
      outputText="Do you want to submit the quiz?"
    }else{
      outputText=`You have not attempted ${unattemptedQuestion} question out of ${questions.length} do you still want to submit the quiz?`
    }

    const userQuiz = {
      quizId: params.id,
      userId: props.userid,
      questions: questions,
    };

    Swal.fire({
      title: "Confirmation",
      text:outputText,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        let url = `/users/${props.userid}/quiz/${params.id}`;
        axios
          .post(url, userQuiz)
          .then((res) => {
            let resultID = res.data.data.userSubmission._doc._id
            navigate(`/user/result/${resultID}`);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Unable to submit the quiz",
              text: "Please try again!",
            });
          });
      }
    });
  };

  return (
    <Row>
      <Col xs={11}>
        <div className="question">
          <Form>
            <Row>
              <Col sm={10}>
                <h5>{questions[questionNumber].title}</h5>
              </Col>
              <Col sm={2}>
                <p>Points: {questions[questionNumber].points}</p>
              </Col>
            </Row>

            <br />
            {questions[questionNumber].isMultipleCorrect === true &&
              questions[questionNumber].options.map((option) => {
                return (
                  <div key={option._id}>
                    <Form.Check
                      type="checkbox"
                      id={option._id}
                      value={option.value}
                      label={option.value}
                      checked={option.isSubmitted}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                );
              })}

            {questions[questionNumber].isMultipleCorrect === false &&
              questions[questionNumber].options.map((option) => {
                return (
                  <div key={option._id}>
                    <Form.Check
                      type="radio"
                      id={option._id}
                      value={option.value}
                      label={option.value}
                      name="options"
                      checked={option.isSubmitted}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                );
              })}

            <hr />
            <br />
            <Row>
              <Col>
                {showPrevious && (
                  <Button variant="primary" onClick={previousBtn}>
                    <BsFillCaretLeftFill />
                    Previous
                  </Button>
                )}
              </Col>
              <Col className="text-center">
                <Button onClick={clearMyChoice}>Clear my choice</Button>
              </Col>
              <Col>
                {nextSubmit === "Next" && (
                  <Button
                    variant="primary"
                    className="float-end"
                    onClick={nextBtn}
                  >
                    {nextSubmit}
                    <BsFillCaretRightFill />
                  </Button>
                )}
                {nextSubmit === "Submit"  && windowUrl && windowUrl.split("/")[4] === "preview" && (
                  <Button
                    variant="primary"
                    className="float-end"
                    disabled
                  >
                    {nextSubmit}
                  </Button>
                )}

                {nextSubmit === "Submit" && windowUrl && windowUrl.split("/")[4] === "quiz" && (
                  <Button
                    variant="primary"
                    className="float-end"
                    onClick={submitQuiz}
                  >
                    {nextSubmit}
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
      <Col xs={1}>
        <Stack gap={3} className="questionScrollBar">
          {props.quizData.questions.map((el, index) => {
            return (
              <Button
                variant="primary"
                onClick={() => questionCall(index)}
                key={el._id}
                className="questionNumber"
              >
                {index + 1}
              </Button>
            );
          })}
        </Stack>
      </Col>
    </Row>
  );
}

export default Question;
