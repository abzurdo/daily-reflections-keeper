
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, CalendarDays } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-journal-blue text-white shadow-md">
      <Link to="/" className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6" />
        <h1 className="text-lg font-bold">{title}</h1>
      </Link>
      <Link to="/history" className="flex items-center space-x-1">
        <CalendarDays className="h-5 w-5" />
        <span>History</span>
      </Link>
    </header>
  );
};

export default Header;
