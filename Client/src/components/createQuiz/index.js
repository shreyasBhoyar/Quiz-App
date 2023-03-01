import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Container, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import CreateQuizQuestion from "./CreateQuizQuestion";
import generateUniqueId from "./UniqueIdGenerator";
import "./createQuiz.css";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const uniqueId = generateUniqueId("");
  const [uniqueIds, setUniqueIds] = useState([uniqueId]);
  const [idtoDelete,setIdtoDelete] = useState();

  const removeQuestion = (event) => {
    setIdtoDelete(event.target.id)
  };

  const [questionList, setQuestionList] = useState([
    <CreateQuizQuestion
      key={uniqueId}
      uniqueId={uniqueId}
      cancel={removeQuestion}
    />,
  ]);

  useEffect(()=>{
    if(idtoDelete){
      let questionID = questionList.findIndex(
        (question) => question.key === idtoDelete
      );
      let uniqueIdIndex = uniqueIds.findIndex(
        (uniqueID) => uniqueID === idtoDelete
      );
      questionList.splice(questionID,1)
      setQuestionList([...questionList])
      uniqueIds.splice(uniqueIdIndex,1)
      setUniqueIds([...uniqueIds])
      setIdtoDelete();
    }
  },[idtoDelete])

  const addQuestion = () => {
    const uniqueId = generateUniqueId("");
    setUniqueIds(uniqueIds.concat(uniqueId));
    setQuestionList(
      questionList.concat(
        <CreateQuizQuestion
          key={uniqueId}
          uniqueId={uniqueId}
          cancel={removeQuestion}
        />
      )
    );
  };

  const validation = (options) => {
    if (options.find((ele) => ele.isCorrect === true)) {
      return true;
    }
  };

  const handleQuizTitleInput = (event) => {
    const quizTitleInput = event.target;
    const quizTitleValue = quizTitleInput.value;
    if (quizTitleValue.length > 45) {
      return Swal.fire({
        icon: "warning",
        title: "Title length exceeded",
        text: "Quiz title cannot be more than 45 characters",
      });
    }
  };

  const handleQuizDescriptionInput = (event) => {
    const quizDescriptionInput = event.target;
    const quizDescriptionValue = quizDescriptionInput.value;
    if (quizDescriptionValue.length > 100) {
      return Swal.fire({
        icon: "warning",
        title: "Description length exceeded",
        text: "Quiz description cannot be more than 100 characters",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      target: { quizTitle, quizdescription },
    } = event;

    const quizData = {
      title: quizTitle.value.trim().toLowerCase(),
      description: quizdescription.value,
      questions: [],
    };

    uniqueIds.forEach((el) => {
      let correctAnsCount = 0;
      const question = {
        title: event.target[`question-${el}`].value,
        points: event.target[`points-${el}`].value,
        options: [],
        isMultipleCorrect: false,
      };

      if (event.target[`points-${el}`].value === "") {
        question.points = 5;
      }

      for (let i = 1; i <= 4; i++) {
        const option = {
          isCorrect: false,
          value: event.target[`option${i}Val-${el}`].value,
        };
        if (event.target[`option${i}-${el}`].checked) {
          option.isCorrect = true;
          correctAnsCount++;
        }
        question.options.push(option);
      }
      if (correctAnsCount > 1) {
        question.isMultipleCorrect = true;
      }

      if (validation(question.options)) {
        quizData.questions.push(question);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Select correct answer/s",
        });
      }
    });

    if(questionList.length===0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Add atleast one question",
      });
      return;
    }

    if (uniqueIds.length === quizData.questions.length) {
      axios
        .post("/quizzes", quizData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Quiz created successfully",
            text: `"${res.data.data.title}" is created `,
          }).then((res) => {
            navigate("/");
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Quiz with this name already exists",
          });
        });
    }
  };

  return (
    <Container className="p-4">
      <h1 className="text-center">Create Quiz</h1>
      <br />
      <Form className="createQuiz" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Quiz Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter quiz title"
              id="quizTitle"
              required
              onInput={handleQuizTitleInput}
            />
            <small className="text-muted">
              Quiz title cannot be more than 45 characters
            </small>
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Quiz Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Enter quiz description"
              id="quizdescription"
              required
              onInput={handleQuizDescriptionInput}
            />
            <small className="text-muted">
              Quiz description cannot be more than 100 characters
            </small>
          </Col>
        </Form.Group>
        <Button variant="primary" className="addQuestion" onClick={addQuestion}>
          Add Question
        </Button>
        <br />
        {questionList}
        <br />
        <Button variant="primary" type="submit" className="float-end">
          Save
        </Button>
        <br />
      </Form>
    </Container>
  );
};

export default CreateQuiz;
