import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import { Toast } from "react-bootstrap";
import {
  BsFillBarChartFill,
  BsFillBookmarksFill,
  BsFillEyeFill,
  BsPencilFill
} from "react-icons/bs";
import TooltipComponent from "./Tooltip";
import "./ListQuiz.css";

const SingleCard = (props) => {
  const [shareLink, setShareLink] = useState("");
  const [show, setShow] = useState(false);
  const quiz = { ...props.quiz };
  let navigate = useNavigate();

  useEffect(() => {
    setShareLink(`https://a96e-2401-4900-1c43-59cd-c599-c029-b86c-f5d9.in.ngrok.io/user/quiz/${quiz._id}`);
  }, []);

  const HandleReport = () => {
    let path = `/quiz/report/${quiz._id}`;
    navigate(path);
  };

  const HandleEdit = () => {
    let path = `/quiz/${quiz._id}`;
    navigate(path);
  };
  const displayTitle = (title) => {
    let res = title;
    if (title.length >= 20) {
      res = title.substring(0, 20) + "...";
    }
    return res.toUpperCase();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(shareLink);
    setShow(true);
  };

  const previewQuiz = () => {
    let path = `/quiz/preview/${quiz._id}`;
    navigate(path);
  };

  return (
    <Card className="card">
      <Card.Body>
        <Card.Title>
          <strong>{displayTitle(quiz.title)}</strong>
        </Card.Title>
        <Card.Text>{quiz.description}</Card.Text>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Link copied</strong>
          </Toast.Header>
          {/* <Toast.Body>Share link has been copied to clipboard</Toast.Body> */}
        </Toast>
        <div className="icon-bar">
          <div className="icons">
            <TooltipComponent
              icon={<BsFillEyeFill onClick={previewQuiz} size={25}/>}
              text="Click to preview quiz"
            />
          </div>

          <div className="icons">
            <TooltipComponent
              icon={<BsFillBookmarksFill onClick={handleShare} size={25}/>}
              text="Click to copy quiz link"
            />
          </div>

          <div className="icons">
            <TooltipComponent
              icon={<BsFillBarChartFill onClick={HandleReport} size={25}/>}
              text="Click to view reports"
            />
          </div>
          <div className="icons">
            <TooltipComponent
              icon={<BsPencilFill onClick={HandleEdit} size={25}/>}
              text="Click to edit quiz"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleCard;
