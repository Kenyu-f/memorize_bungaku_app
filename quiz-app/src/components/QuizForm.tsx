import React, { useState } from 'react';

const QuizForm = ({ onAddQuiz }) => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question && answers.every(answer => answer)) {
            onAddQuiz({ question, answers });
            setQuestion('');
            setAnswers(['', '', '', '']);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Question:</label>
                <input 
                    type="text" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Answers:</label>
                {answers.map((answer, index) => (
                    <input 
                        key={index} 
                        type="text" 
                        value={answer} 
                        onChange={(e) => handleAnswerChange(index, e.target.value)} 
                        required 
                    />
                ))}
            </div>
            <button type="submit">Add Quiz</button>
        </form>
    );
};

export default QuizForm;