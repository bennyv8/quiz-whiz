import "./styles/take-quiz.css";
import { Route, Routes } from "react-router-dom";

import Begin from "./quiz-components/Begin.jsx";
import Quiz from "./Quiz.jsx";
import Summary from "./quiz-components/Summary.jsx";

function TakeQuiz() {
  return (
    <div className="container">
      <Routes>
        <Route path="/start" element={<Begin />}></Route>
        <Route path="/question" element={<Quiz />}></Route>
        <Route path="/summary" element={<Summary />}></Route>
      </Routes>
    </div>
  );
}

export default TakeQuiz;
