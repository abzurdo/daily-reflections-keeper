
import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "Daily Reflections" }) => {
  return (
    <div className="flex flex-col min-h-screen bg-journal-cream">
      <Header title={title} />
      <main className="flex-grow p-4">{children}</main>
      <footer className="p-4 text-center text-sm text-journal-brown bg-journal-sand">
        <p>Daily Reflections Journal &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
