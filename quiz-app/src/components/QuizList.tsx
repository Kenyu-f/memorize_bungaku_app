import React from 'react';
import { Quiz } from '../types';

interface QuizListProps {
  quizzes: Quiz[];
}

const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
  return (
    <div>
      <h2>Quiz List</h2>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={index}>
            <h3>{quiz.question}</h3>
            <ul>
              {quiz.answers.map((answer, idx) => (
                <li key={idx}>{answer}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;