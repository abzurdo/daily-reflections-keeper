
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { getAllJournalEntries } from "@/utils/journal-storage";
import { JournalEntry } from "@/types/journal";
import JournalEntryItem from "@/components/JournalEntryItem";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";

const History: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const allEntries = getAllJournalEntries();
    // Sort by date, most recent first
    const sortedEntries = [...allEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEntries(sortedEntries);
    setFilteredEntries(sortedEntries);
  }, []);
  
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEntries(entries);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = entries.filter(entry => {
      // Search by date
      if (entry.date.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in answers
      return entry.questions.some(qa => 
        qa.answer.toLowerCase().includes(query) || 
        qa.question.toLowerCase().includes(query)
      );
    });
    
    setFilteredEntries(filtered);
  }, [searchQuery, entries]);
  
  return (
    <Layout title="Journal History">
      <div className="max-w-md mx-auto">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-journal-sand focus:border-journal-blue"
          />
        </div>
        
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-journal-blue mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-gray-500">
              {entries.length === 0
                ? "No journal entries yet"
                : "No entries match your search"}
            </h3>
            <p className="text-gray-400 mt-2">
              {entries.length === 0
                ? "Start your reflection journey today"
                : "Try a different search term"}
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-journal-brown">
              {filteredEntries.length} {filteredEntries.length === 1 ? "Entry" : "Entries"}
            </h3>
            {filteredEntries.map(entry => (
              <JournalEntryItem key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
