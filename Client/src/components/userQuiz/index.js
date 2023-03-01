import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import Question from "./Question";
import UserModal from "../createUser/userModal";
import problemSolving from "../../assets/problemSolving.png";
import "./userQuiz.css";

const PreviewQuiz = () => {
    let params = useParams();
    const [quizData, setQuizData] = useState({})
    const [totalPoints, setTotalPoints] = useState(0)
    const [modalName, setModalName] = useState("");
    const [userID, setUserID] = useState("");
    const [windowUrl, setWindowUrl] = useState()

    useEffect(() => {
        setWindowUrl(window.location.href)
        console.log(window.location.href.split("/")[4])
        let url = `/users/quiz/${params.id}`;
        axios.get(url)
            .then((res) => {
                setQuizData({ ...(res.data.data) })
                let points = 0
                res.data.data.questions.forEach((question) => {
                    points = points + question.points
                })
                setTotalPoints(points);
            })
            .catch((err) => {

                Swal.fire({
                    icon: "error",
                    title: "Unable to load quiz",
                })
            })
        
        
      }, []);
    
    useEffect(() => {
        if (modalName !== "") {
            let data = {
              username: modalName,
            };
            axios.post("/users", data).then((res) => {
              let userId = res.data.data._id;
              setUserID(userId);
              let quizid = params.id;
              if (res.data.data.quizAttempted.find((el) => el === quizid)) {
                setModalName("");
                Swal.fire({
                  icon: "error",
                  title: "Attempts exhausted !",
                  text: "User has already attempted the test",
                });
              } else {
                Swal.fire({
                  icon: "success",
                  title: "Test activated",
                  text: `Welcome ${res.data.data.username}`,
                });
              }
            });
          }
    }, [modalName])

    

    return (
        <Container className="p-3 previewQuiz">
            {
                windowUrl && windowUrl.split("/")[4] === "preview" &&

                <>
                   <br />
                    <Row>
                    <Col sm={8}>
                        <h1>{quizData.title && quizData.title.toUpperCase()}{" "}<span style={{fontSize:"25px"}}>(Preview Mode)</span></h1> 
                    </Col>
                    <Col sm={4}>
                        <h6>Total Points: {totalPoints}</h6>
                    </Col>
                </Row>

                    {quizData.questions && (
                        <Question className="question" quizData={quizData} />
                    )}
                </>

            }
            { windowUrl && windowUrl.split("/")[4] === "quiz" &&
                <><UserModal name={modalName} setName={setModalName} />
                  {  (modalName === "") ? (
                    <>
                        <Container className="p-5 text-center">
                            <h1>{quizData.title && quizData.title.toUpperCase()}</h1>
                            <br />
                            <Button
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Attempt Quiz
                            </Button>
                            <br />
                            <img
                                src={problemSolving}
                                alt="problem solving"
                                className="userQuizImg"
                            />
                        </Container>
                    </>
                    ) : (
                    <>
                        <br />
                        <Row>
                            <Col sm={8}>
                                <h1>{quizData.title && quizData.title.toUpperCase()}</h1>
                            </Col>
                            <Col sm={4}>
                                <h6>Total Points: {totalPoints}</h6>
                            </Col>
                        </Row>
                        
                        { quizData.questions && userID !== "" && (
                            <Question
                                className="question"
                                quizData={quizData}
                                userid={userID}
                            />
                        )}
                    </>
                    )
                        }
                </>

            }
        </Container>


    );
};

export default PreviewQuiz;
