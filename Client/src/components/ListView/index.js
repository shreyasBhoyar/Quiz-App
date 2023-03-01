import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SingleCard from "./SingleCard";

function ListQuiz() {
  const [Quizzes, setQuizzes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("/quizzes")
      .then((res) => {
        setQuizzes(res.data.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Unable to load list quizzes",
        });
      });
  }, []);

  return (
    <>
    <label style={{marginRight:"1rem"}}>Search for Quiz using title </label>
      <input
        placeholder="Enter Quiz Title"
        onChange={(event) => setQuery(event.target.value)}
        size="40"
        style={{outline:"none"}}
      />
      {Quizzes.length > 0 &&
        Quizzes.slice(0)
          .reverse()
          .filter((quiz) => {
            if (query === "") {
              return quiz;
            } else if (quiz.title.toLowerCase().includes(query.toLowerCase())) {
              return quiz;
            }
          })
          .map((quiz) => <SingleCard quiz={quiz} key={quiz._id} />)}
    </>
  );
}

export default ListQuiz;
