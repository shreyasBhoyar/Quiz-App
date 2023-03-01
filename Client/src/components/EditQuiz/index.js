import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Col, Row, Form, Container, Button } from "react-bootstrap";

import axios from "axios";
import Swal from "sweetalert2";
import CreateQuizQuestion from "./CreateQuizQuestion";
import generateUniqueId from "./UniqueIdGenerator";
import "./createQuiz.css";

const EditQuiz = () => {
  let params = useParams();
  const quizId = params.id;
  const [oldQuizData,setOldQuizData] = useState({
    title : "",
    description : "",
    questions : []
  });
  const navigate = useNavigate();
  const uniqueId = generateUniqueId("");
  const [uniqueIds, setUniqueIds] = useState([]);
  const [idtoDelete,setIdtoDelete] = useState();
const [questions,setQuestions] = useState([])
const [addQuestions,setAddQuestions] = useState(true)
  const removeQuestion = (event) => {
    setIdtoDelete(event.target.id)
  };

  useEffect(()=>{
    axios.get(`/quizzes/${quizId}`).then((res)=>{
      setOldQuizData(res.data.data)
      setQuestions(res.data.data.questions)
    })
  },[])

  const [questionList, setQuestionList] = useState([])

  useEffect(()=>{
    if(questions.length>0 && addQuestions===true){

    if(questions[questionList.length]){
      const uniqueId = generateUniqueId("");
      setUniqueIds(uniqueIds.concat(uniqueId));
      let questionElement = 
      <CreateQuizQuestion
        key={uniqueId}
        uniqueId={uniqueId}
        cancel={removeQuestion}
        defaultData = {questions[questionList.length]}
      />
      setQuestionList(questionList.concat(questionElement))
    }else{
      setAddQuestions(false)
    }
     
    }
  },[questionList,questions])

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
    let emptyDefault = {
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
    }
    setQuestionList(
      questionList.concat(
        <CreateQuizQuestion
          key={uniqueId}
          uniqueId={uniqueId}
          cancel={removeQuestion}
          defaultData={emptyDefault}

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

  const handleOnChange=(event)=>{
    let key = event.target.id.split("-")[1]
    let temp = {...oldQuizData}
    temp[key] = event.target.value
    setOldQuizData(temp)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
   let quizTitle = event.target['quiz-title'].value
   let quizdescription = event.target['quiz-description'].value
    const quizData = {
      title: quizTitle.trim().toLowerCase(),
      description: quizdescription,
      questions: [],
    };

    uniqueIds.forEach((el) => {
      let correctAnsCount = 0;
      const question = {
        title: event.target[`question-${el}-title`].value,
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
          value: event.target[`optionVal-${i-1}-${el}`].value,
        };
        
        if (event.target[`option-${i-1}-${el}`].checked) {
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
        .put(`/quizzes/${quizId}`, quizData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Quiz updated successfully",
            text: `"${res.data.data.title}" is updated `,
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

      <h1 className="text-center">Edit Quiz</h1>
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
              id="quiz-title"
              required
              onInput={handleQuizTitleInput}
              value={oldQuizData.title}
              onChange={handleOnChange}
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
              id="quiz-description"
              required
              onInput={handleQuizDescriptionInput}
              value={oldQuizData.description}
              onChange={handleOnChange}
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

export default EditQuiz;
