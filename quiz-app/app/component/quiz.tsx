'use client'
import React, { useState } from 'react';
import { quiz } from '../Data/question';
import ScoreCard from './scorecard';


interface QuizResult {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface QuizProps {
  name: string;
}

const Quiz: React.FC<QuizProps> = ({ name }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answerChecked, setAnswerChecked] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[currentQuestionIndex];

  const onAnswerSelected = (answer: string, idx: number): void => {
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer);
    setAnswerChecked(true);
  };

  const handleNextQuestion = (): void => {
    if (selectedAnswer === correctAnswer) {
      setQuizResult((prev) => ({
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      setQuizResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
    setSelectedAnswer('');
    setSelectedAnswerIndex(null);
    setAnswerChecked(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      {/* Quiz Content */}
      {!showResults ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">{question}</h4>
          <ul className="space-y-2">
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedAnswerIndex === idx
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <b className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1}/{questions.length}
            </b>
            <button
              onClick={handleNextQuestion}
              className={`px-4 py-2 text-white cursor-pointer rounded-lg transition-colors duration-300 ${
                !answerChecked
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={!answerChecked}
            >
              {currentQuestionIndex === questions.length - 1
                ? 'Submit'
                : 'Next Question'}
            </button>
          </div>
        </div>
      ) : (
        <ScoreCard
          quizResult={quizResult}
          questions={questions}
          name={name}
        />
      )}
    </div>
  );
};

export default Quiz;
