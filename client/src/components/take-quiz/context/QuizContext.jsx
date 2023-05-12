import { useState, useEffect, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Create the context object
export const QuizContext = createContext();

// Create the provider component
export const QuizProvider = ({ children }) => {
  // Set up state variables here
  let { id } = useParams();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState([{}]);

  const [time, setTime] = useState(300000);

  const [questions, setQuestions] = useState([{}]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAs, setCorrectAs] = useState(0);

  const [finished, setFinished] = useState(false);
  const [duration, setDuration] = useState(0);

  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("Whoops, You Haven't Take Any Tests Yet!");

  // Set up the Quiz for User
  const fetchQuizData = async (id) => {
    try {
      const payload = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URI}/quiz/${id}/start`,
      });
      payload && setQuizDetails(payload.data);
      // console.log("Got PAYLOAD", payload.data);
    } catch (err) {
      console.log("There was an error getting your quiz", err);
    }
  };

  const fetchQuizQuestions = async (id) => {
    try {
      const payload = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URI}/quiz/${id}/question`,
      });

      let quizQs = payload && JSON.parse(payload.data);
      // console.log("Got PAYLOAD", quizQs);
      quizQs && setQuestions(quizQs);
    } catch (err) {
      console.log("There was an error getting your questions", err);
    }
  };

  // Clear Old Answers, Duration, Status, and Score from Previous Quizzes
  const resetQuiz = () => {
    localStorage.clear();
    setScore(0);
    setDuration(0);
    setFinished(false);
  };

  // Get User's Answers
  const getUserAnswers = () => {
    if (localStorage.length) {
      const as = [];
      for (var i = 0; i <= localStorage.length; i++) {
        let a = JSON.parse(localStorage.getItem(i));
        a && as.push(a);
        as.length && setUserAnswers(as);
      }
    }
  };

  // Get Total Correctly Answered Quiz Questions
  const getCorrectAnswerCount = () => {
    if (localStorage.length) {
      let count = 0;

      for (var i = 0; i <= localStorage.length; i++) {
        let a = JSON.parse(localStorage.getItem(i));

        if (a && a.key === "corrAns") {
          count++;
        }
      }

      setCorrectAs(count);
    }
  };

  // const saveHistory = async (payload) => {
  //   try {
  //     axios.post(`/${id}`, {
  //       user_id: payload.user_id,
  //       score: payload.score,
  //       quiz_id: payload.id,
  //       duration: payload.duration,
  //       finished: payload.finished,
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // =============================================
  //             Quiz Timer Utilities
  // =============================================
  const setTimer = (time) => {
    /* check if element exists  */
    let timer = document.getElementById("timer");

    if (timer) {
      /* countdown timer for quizzes, starts when Question Page loads  */
      let timeRemaining = time;

      var quizTimer = setInterval(() => {
        let minutes = Math.floor((timeRemaining / 1000 / 60) << 0);
        let seconds = Math.floor((timeRemaining / 1000) % 60);

        timer.innerHTML = `${minutes} : ${
          seconds === 0
            ? "00"
            : seconds.toString().length < 2
            ? "0" + seconds
            : seconds
        } left`;

        // Decrement Time Remaining by 1 second
        timeRemaining -= 1000;

        // Time has run out!
        if (timeRemaining <= 0) {
          clearInterval(quizTimer);
          setDuration(time);
          setMsg("Oh no! Your Time Is Up!");
          navigate(`/quiz/${id}/summary`);
        }
      }, 1000);
    }
  };

  const handleTimerChange = (e) => {
    setTime(e.target.value);
  };

  // =============================================
  //           	 Lifecycle Methods
  // =============================================
  // Update the Quiz Data Based on Current Quiz ID
  useEffect(() => {
    if (id) {
      const data = fetchQuizData(id);
      const questions = fetchQuizQuestions(id);
      setQuizDetails(data);
      setQuestions(questions);
      getUserAnswers();
      setTimer(time);
    }
  }, [id]);

  // Set Summary Message based on User's Quiz Score
  useEffect(() => {
    if (score > 60) {
      setMsg("Congratulations, You Passed!");
    } else if (score <= 60) {
      setMsg("Oh no! You didn't pass, would you like to try again?");
    } else {
      setMsg("Oh no! You ran out of time. Take another stab at it?");
    }
  }, [score, setMsg]);

  // Context to be used in other components
  const ctx = {
    id,

    questions,
    setQuestions,

    quizDetails,
    setQuizDetails,

    resetQuiz,
    userAnswers,
    getUserAnswers,

    getCorrectAnswerCount,
    correctAs,

    msg,
    setMsg,

    score,
    setScore,

    // saveHistory,

    finished,
    setFinished,

    duration,
    setDuration,

    time,
    setTimer,
    handleTimerChange,
  };

  // Return the provider component with the context value
  return <QuizContext.Provider value={ctx}>{children}</QuizContext.Provider>;
};
