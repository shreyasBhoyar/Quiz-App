import { Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dashboard from "../../assets/dashboard.jpg";
import ListQuiz from "../ListView";
import "./index.css";

const AdminDashBoard = () => {
  let navigate = useNavigate();

  const createQuizNavigate = () => {
    let path = "/quiz/create";
    navigate(path);
  };

  return (
    <div>
      <Container>
        <div className="dashboardCreateQuiz">
          <Button
            variant="primary"
            onClick={createQuizNavigate}
            className="createQuizBtn"
          >
            Create Quiz
          </Button>
        </div>
        <br />
        <br />
        <Row>
          <Col>
            <ListQuiz />
          </Col>
          <Col className="dashboardImgCol">
            <img src={dashboard} alt="dashboard" className="dashboardImg" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashBoard;
