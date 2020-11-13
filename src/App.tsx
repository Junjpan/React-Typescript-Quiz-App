import React, { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, QuestionsState, Difficult } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswers: string;
};

const Total_questions = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      Total_questions,
      Difficult.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer=e.currentTarget.value;
      console.log(answer)
      const correct=questions[number].correct_answer===answer;
      if(correct)setScore(prev=>prev+1);
      const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswers:questions[number].correct_answer
      };

      setUserAnswers((prev)=>[...prev,answerObject])
    }
  };

  const nextQuestion = () => {
    const nextQuestion=number+1;
    if(nextQuestion===Total_questions){
      setGameOver(true);
    }else{
      setNumber(nextQuestion)
    }

};

  return (
    <div className='App'>
      <h1>React Qioz</h1>
      {gameOver || userAnswer.length === Total_questions ? (
        <button className='start' onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver && <p className='score'>Scores:</p>}
      {loading && <p>Loading questions:...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={Total_questions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== Total_questions - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
