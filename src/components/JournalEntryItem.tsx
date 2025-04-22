
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalEntry } from "@/types/journal";
import { getFormattedDate } from "@/utils/journal-storage";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock } from "lucide-react";

interface JournalEntryItemProps {
  entry: JournalEntry;
}

const JournalEntryItem: React.FC<JournalEntryItemProps> = ({ entry }) => {
  const answeredQuestions = entry.questions.filter(q => q.answer.trim().length > 0).length;
  const totalQuestions = entry.questions.length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);
  
  return (
    <Link to={`/journal/${entry.date}`}>
      <Card className="mb-4 border-l-4 hover:shadow-lg transition-shadow duration-200 border-journal-blue bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">{getFormattedDate(entry.date)}</CardTitle>
          <div className="flex items-center">
            {entry.completed ? (
              <div className="flex items-center text-green-600">
                <CheckCircle2 className="w-5 h-5 mr-1" />
                <span className="text-sm">Complete</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <Clock className="w-5 h-5 mr-1" />
                <span className="text-sm">{progress}% done</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {entry.questions.slice(0, 1).map(qa => (
            <div key={qa.questionId} className="text-gray-600 truncate">
              <span className="font-medium">{qa.question}:</span>{" "}
              {qa.answer ? qa.answer.substring(0, 60) + (qa.answer.length > 60 ? "..." : "") : "No answer yet"}
            </div>
          ))}
          {answeredQuestions > 1 && (
            <p className="text-sm text-gray-500 mt-1">
              {answeredQuestions - 1} more {answeredQuestions - 1 === 1 ? "answer" : "answers"}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default JournalEntryItem;
