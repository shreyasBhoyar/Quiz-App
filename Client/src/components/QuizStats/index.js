import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import UserReportTable from "./UserReportTable";
import test from "../../assets/quizReportNotFound.png";
import ExportReactCSV from "./exportCSV";
import "./quizStat.css";
import { Col, Container, Row } from "react-bootstrap";

const QuizStats = () => {
  let params = useParams();
  const [quizStats, setQuizStats] = useState({});
  const [userResult, setUserResult] = useState([]);
  useEffect(() => {
    let url = `/reports/${params.id}`;
    axios
      .get(url)
      .then((res) => {
        setQuizStats(res.data.data);
        setUserResult(res.data.data.userStats);
      })
      .catch((err) => {
        console.log("Error in fetching users ...", err);
      });
  }, []);

  return <>

    {userResult && userResult.length > 0 ? (
      <div id="outer">
        <div id="top">
          <h3>Quiz Reports</h3>
          <p>
            <br />
            <h4>{quizStats.quizName.toUpperCase()}</h4>
            <br />
            
            <Row>
              <Col >
                <h5><span>Average score : </span> {quizStats.averageScore.toString().slice(0, 5)}</h5>
              </Col>
              <Col >
                <h5><span>Total attempts : </span> {quizStats.totalAttempts}</h5>
              </Col>
              <Col >
                <h5><span>Total Points : </span> {quizStats.totalPoints}</h5>
              </Col>
            </Row>
          </p>
        </div>
        <UserReportTable results={userResult} />{" "}
        <ExportReactCSV csvData={userResult} fileName="QuizReports" />
        <br />
        <br />
      </div>

    ) : (
      <Container className=" noRes p-5 text-center ">
        <h3>No user has attempted the quiz yet...</h3>
        <img
          className="noResImg"
          src={test}
          alt="Test with clock"
        />
      </Container>
    )}

  </>

};

export default QuizStats;
