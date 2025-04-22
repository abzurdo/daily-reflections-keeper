
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BookOpen, Plus } from "lucide-react";
import { 
  createEmptyJournalEntry, 
  formatDate, 
  getAllJournalEntries, 
  getJournalEntryByDate 
} from "@/utils/journal-storage";
import { useToast } from "@/hooks/use-toast";
import { JournalEntry } from "@/types/journal";

const Home: React.FC = () => {
  const { toast } = useToast();
  const [todaysEntry, setTodaysEntry] = useState<JournalEntry | null>(null);
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
  const today = formatDate(new Date());

  useEffect(() => {
    // Check for today's entry
    const entry = getJournalEntryByDate(today);
    setTodaysEntry(entry || null);

    // Get recent entries
    const allEntries = getAllJournalEntries();
    const recent = allEntries
      .filter(e => e.date !== today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
      
    setRecentEntries(recent);
  }, [today]);

  const createNewEntry = () => {
    if (todaysEntry) {
      toast({
        title: "Entry exists",
        description: "You already have an entry for today.",
      });
      return;
    }

    const newEntry = createEmptyJournalEntry(today);
    setTodaysEntry(newEntry);
  };

  const getEntryProgress = (entry: JournalEntry): number => {
    const answered = entry.questions.filter(q => q.answer.trim().length > 0).length;
    return Math.round((answered / entry.questions.length) * 100);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Card className="mb-6 bg-white shadow-lg border-journal-blue">
          <CardHeader className="bg-journal-blue text-white">
            <h2 className="text-xl font-bold text-center">Daily Reflection Journal</h2>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-journal-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2">Welcome to your journal</h3>
            <p className="text-gray-600 mb-4">
              Take a few moments each day to reflect on your experiences and feelings.
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 flex justify-center">
            {todaysEntry ? (
              <Link to={`/journal/${today}`} className="w-full">
                <Button className="w-full bg-journal-blue hover:bg-journal-light-blue">
                  Continue Today's Entry ({getEntryProgress(todaysEntry)}% complete)
                </Button>
              </Link>
            ) : (
              <Link to={`/journal/${today}`} className="w-full">
                <Button 
                  onClick={createNewEntry} 
                  className="w-full bg-journal-blue hover:bg-journal-light-blue flex items-center justify-center"
                >
                  <Plus className="mr-2 h-4 w-4" /> Start Today's Reflection
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>

        {recentEntries.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Recent Entries</h3>
            {recentEntries.map(entry => (
              <Link key={entry.id} to={`/journal/${entry.date}`}>
                <div className="p-3 mb-2 rounded-lg bg-white shadow border-l-4 border-journal-sand hover:border-journal-blue transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <span className="text-xs bg-journal-sand text-journal-brown px-2 py-1 rounded-full">
                      {getEntryProgress(entry)}% complete
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <div className="mt-4 text-center">
              <Link to="/history">
                <Button variant="outline" className="text-journal-blue border-journal-blue hover:bg-journal-light-blue hover:text-white">
                  View All Entries
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
