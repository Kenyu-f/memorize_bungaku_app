export interface Answer {
    id: number;
    text: string;
    isCorrect: boolean;
}

export interface Quiz {
    id: number;
    question: string;
    answers: Answer[];
}