import React, { useState } from 'react';
import ChatbotWindow from './ChatbotWindow';

const ChatbotButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatbotWindow onClose={() => setOpen(false)} />}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Open Chatbot"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Custom Robot Chatbot Icon */}
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
          <circle cx="32" cy="32" r="30" fill="#0A1747" />
          <path d="M16 36c0-8.837 7.163-16 16-16s16 7.163 16 16c0 4.418-3.582 8-8 8h-16c-4.418 0-8-3.582-8-8z" fill="white" />
          <rect x="20" y="28" width="24" height="14" rx="7" fill="#0A1747" />
          <circle cx="27" cy="35" r="3" fill="#00E6FF" />
          <circle cx="37" cy="35" r="3" fill="#00E6FF" />
          <rect x="30" y="12" width="4" height="8" rx="2" fill="white" />
          <circle cx="32" cy="10" r="2" fill="white" />
        </svg>
      </button>
    </>
  );
};

export default ChatbotButton; 