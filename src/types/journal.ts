
export interface JournalEntry {
  id: string;
  date: string;
  questions: QuestionAnswer[];
  completed: boolean;
}

export interface QuestionAnswer {
  questionId: number;
  question: string;
  answer: string;
}

export interface Question {
  id: number;
  text: string;
}

export const DAILY_QUESTIONS: Question[] = [
  { id: 1, text: "What are you grateful for today?" },
  { id: 2, text: "How do you feel right now?" },
  { id: 3, text: "What was the highlight of your day?" },
  { id: 4, text: "What was challenging today?" },
  { id: 5, text: "What did you learn today?" },
  { id: 6, text: "How did you take care of yourself today?" },
  { id: 7, text: "What made you smile today?" },
  { id: 8, text: "What would you do differently next time?" },
  { id: 9, text: "What's one thing you want to remember about today?" },
  { id: 10, text: "What are you looking forward to tomorrow?" }
];
