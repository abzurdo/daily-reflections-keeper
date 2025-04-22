
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { QuestionAnswer } from "@/types/journal";

interface QuestionCardProps {
  questionAnswer: QuestionAnswer;
  onChange: (answer: string) => void;
  index: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionAnswer,
  onChange,
  index,
  totalQuestions,
}) => {
  return (
    <Card className="mb-4 border-journal-blue border-2 bg-white shadow-md">
      <CardHeader className="bg-journal-light-blue text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">
            Question {index + 1} of {totalQuestions}
          </h3>
          <span className="text-sm bg-white text-journal-blue rounded-full px-2 py-1">
            {Math.round(((index + 1) / totalQuestions) * 100)}%
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-4 text-lg font-medium">{questionAnswer.question}</p>
        <Textarea
          placeholder="Write your reflection here..."
          className="min-h-[120px] border-journal-sand focus:border-journal-blue"
          value={questionAnswer.answer}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
