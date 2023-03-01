import QuizTitleCard from "./QuizTitleCard";
import QuizResultCard from "./QuizResultCard";
import QuizScoreCard from "./QuizScoreCard";
import QuizCorrectAnswer from "./QuizCorrectAnswer";
import "./index.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizWrongAnswer from "./QuizWrongAnswer";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

const ResultPage = () => {
  const [userResult, setUserResult] = useState();
  let params = useParams();
  let resultID = params.id;
  useEffect(() => {
    axios.get(`/users/result/${resultID}`).then((res) => {
      setUserResult(res.data.data);
    });
  }, []);
  return (
    <div className="resultContainer">
      <Container className="resultPage text-center">
        <h2>Quiz Results</h2>
        {userResult && (
          <>
            <QuizTitleCard
              className="QuizTitleCard"
              quizTitle={userResult.quiz.title}
              quizDescription={userResult.quiz.description}
            />

            <div className="singleLine">
              <QuizCorrectAnswer correctAns={userResult.result.correctAns} totalQuestions={userResult.quiz.questions.length} />
              <QuizWrongAnswer wrongAns={userResult.result.wrongAns} totalQuestions={userResult.quiz.questions.length} />
              {/* <QuizScoreCard score={userResult.result.score} totalScore={userResult.result.totalScore}/> */}
            </div>

            <QuizResultCard
              score={userResult.result.score}
              totalQuestions={userResult.result.totalScore}
            />
          </>
        )}
      </Container>
    </div>

  );
};

export default ResultPage;
