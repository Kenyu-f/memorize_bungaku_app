import React, { useState } from 'react';
import AddQuiz from './components/AddQuiz';
import QuizList from './components/QuizList';
import { Quiz } from './types';

const App: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    const addQuiz = (quiz: Quiz) => {
        setQuizzes([...quizzes, quiz]);
    };

    return (
        <div>
            <h1>Quiz Application</h1>
            <AddQuiz onAddQuiz={addQuiz} />
            <QuizList quizzes={quizzes} />
            <footer>
                <p>Developer: <a href="https://github.com/Kenyu-f">github.com/Kenyu-f</a></p>
            </footer>
        </div>
    );
};

export default App;