import React from 'react';

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

interface ScoreCardProps {
  quizResult: QuizResult;
  questions: Question[];
  name: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ quizResult, questions, name }) => {
  const passPercentage = 60;
  const percentage = (quizResult.score / (questions.length * 5)) * 100;
  const status = percentage >= passPercentage ? 'passed' : 'failed';

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Hello, {name}. Here is your result:</h3>
      <table className="min-w-full table-auto">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-semibold">Total Questions</td>
            <td className="px-4 py-2">{questions.length}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Total Score</td>
            <td className="px-4 py-2">{quizResult.score}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Correct Answers</td>
            <td className="px-4 py-2">{quizResult.correctAnswers}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Wrong Answer Questions</td>
            <td className="px-4 py-2">{quizResult.wrongAnswers}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Percentage</td>
            <td className="px-4 py-2">{percentage.toFixed(2)}%</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Status</td>
            <td className="px-4 py-2">{status}</td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Restart
      </button>
    </div>
  );
};

export default ScoreCard;
