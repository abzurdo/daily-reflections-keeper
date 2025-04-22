
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { 
  createEmptyJournalEntry, 
  formatDate,
  getFormattedDate,
  getJournalEntryByDate, 
  saveJournalEntry 
} from "@/utils/journal-storage";
import { JournalEntry as JournalEntryType, QuestionAnswer } from "@/types/journal";
import { ArrowLeft, ArrowRight, Save, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JournalEntry: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entry, setEntry] = useState<JournalEntryType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // If no date provided, use today's date
  const entryDate = date || formatDate(new Date());
  
  useEffect(() => {
    // Get existing entry or create a new one
    const existingEntry = getJournalEntryByDate(entryDate);
    if (existingEntry) {
      setEntry(existingEntry);
    } else {
      setEntry(createEmptyJournalEntry(entryDate));
    }
  }, [entryDate]);
  
  if (!entry) {
    return <div>Loading...</div>;
  }
  
  const currentQuestion = entry.questions[currentQuestionIndex];
  
  const handleAnswerChange = (answer: string) => {
    const updatedQuestions = [...entry.questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      answer,
    };
    
    setEntry({
      ...entry,
      questions: updatedQuestions,
    });
  };
  
  const handleSave = (markAsCompleted = false) => {
    if (!entry) return;
    
    const updatedEntry = {
      ...entry,
      completed: markAsCompleted || entry.questions.every(q => q.answer.trim().length > 0),
    };
    
    saveJournalEntry(updatedEntry);
    toast({
      title: markAsCompleted ? "Journal entry completed!" : "Progress saved",
      description: markAsCompleted ? "Your reflection has been saved." : "Your progress has been saved.",
    });
    
    if (markAsCompleted) {
      navigate('/');
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < entry.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      handleSave();
    }
  };
  
  return (
    <Layout title="Daily Reflection">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-journal-brown">
          {getFormattedDate(entryDate)}
        </h2>
        
        <QuestionCard
          questionAnswer={currentQuestion}
          onChange={handleAnswerChange}
          index={currentQuestionIndex}
          totalQuestions={entry.questions.length}
        />
        
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="border-journal-blue text-journal-blue hover:bg-journal-light-blue hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          {currentQuestionIndex < entry.questions.length - 1 ? (
            <Button 
              onClick={goToNextQuestion}
              className="bg-journal-blue hover:bg-journal-light-blue"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={() => handleSave(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            onClick={() => handleSave()}
            className="text-journal-brown"
          >
            <Save className="mr-2 h-4 w-4" /> Save Progress
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default JournalEntry;
