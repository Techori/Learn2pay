import React, { useRef, useEffect, useState } from 'react';
import { sendChatbotMessage } from '../../utils/api';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotWindowProps {
  onClose: () => void;
}

const initialMessages: Message[] = [
  { sender: 'bot', text: 'Hello! How can I help you today?' },
];

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: 'user', text: trimmed },
    ]);
    setInput('');
    setIsTyping(true);
    try {
      const res = await sendChatbotMessage(trimmed);
      if (res && res.reply) {
        setMessages((msgs) => [
          ...msgs,
          { sender: 'bot', text: res.reply },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          { sender: 'bot', text: 'Sorry, I could not get a response.' },
        ]);
      }
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    }
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Chatbot window"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div className="p-4 border-b font-semibold flex justify-between items-center">
        <span>Chatbot</span>
        <button
          className="text-gray-400 hover:text-gray-600 text-xl font-bold focus:outline-none"
          aria-label="Close Chatbot"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2" id="chatbot-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === 'user'
                ? 'flex justify-end'
                : 'flex justify-start'
            }
          >
            <div
              className={
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-lg px-3 py-2 max-w-[75%] text-sm shadow'
                  : 'bg-gray-200 text-gray-800 rounded-lg px-3 py-2 max-w-[75%] text-sm shadow'
              }
              aria-label={msg.sender === 'user' ? 'Your message' : 'Bot message'}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 rounded-lg px-3 py-2 max-w-[75%] text-sm shadow italic animate-pulse">
              Bot is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="p-3 border-t flex gap-2 bg-white" onSubmit={handleSend} aria-label="Send message form">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Type your message"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotWindow; 