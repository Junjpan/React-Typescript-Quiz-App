import React, { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, QuestionsState, Difficult } from "./API";

type AnswerObject={
  question:string;
  answer:string;
  correct:boolean;
  correctAnswers:string
}


const Total_questions = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    const newQuestions=await fetchQuizQuestions(Total_questions, Difficult.EASY);
    console.log(newQuestions)
  };

  startTrivia()

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className='App'>
      <h1>React Qioz</h1>
      <button className='start' onClick={startTrivia}>
        Start
      </button>
      <p className='score'>Scores:</p>
      <p>Loading questions:...</p>
      {/*<QuestionCard
        questionNr={number + 1}
        totalQuestions={Total_questions}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswer?userAnswer[number]:undefined}
        callback={checkAnswer}
      />*/}
      <button className='next' onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default App;
