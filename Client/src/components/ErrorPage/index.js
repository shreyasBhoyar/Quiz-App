import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import ErrorImage from "../../assets/pageNotFound.png";
import "./error.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="parentDivError text-center">
      <div>
        <img src={ErrorImage} alt="error" />
      </div>
      <div className="text">
        <button onClick={ ()=>navigate(-1)} className="backBtn">Back</button>
      </div>
    </Container>
  );
};

export default ErrorPage;
