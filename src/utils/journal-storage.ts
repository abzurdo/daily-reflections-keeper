
import { JournalEntry, QuestionAnswer, DAILY_QUESTIONS } from "@/types/journal";

const JOURNAL_STORAGE_KEY = "daily_reflections_journal";

export const saveJournalEntry = (entry: JournalEntry): void => {
  const entries = getAllJournalEntries();
  
  // Check if entry for today already exists
  const existingEntryIndex = entries.findIndex(e => e.date === entry.date);
  
  if (existingEntryIndex >= 0) {
    // Update existing entry
    entries[existingEntryIndex] = entry;
  } else {
    // Add new entry
    entries.push(entry);
  }
  
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
};

export const getJournalEntryByDate = (date: string): JournalEntry | undefined => {
  const entries = getAllJournalEntries();
  return entries.find(entry => entry.date === date);
};

export const getAllJournalEntries = (): JournalEntry[] => {
  const entriesJson = localStorage.getItem(JOURNAL_STORAGE_KEY);
  if (!entriesJson) {
    return [];
  }
  
  try {
    return JSON.parse(entriesJson) as JournalEntry[];
  } catch (error) {
    console.error("Failed to parse journal entries:", error);
    return [];
  }
};

export const createEmptyJournalEntry = (date: string): JournalEntry => {
  return {
    id: `entry-${date}-${Date.now()}`,
    date,
    questions: DAILY_QUESTIONS.map(q => ({
      questionId: q.id,
      question: q.text,
      answer: ""
    })),
    completed: false
  };
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getFormattedDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
