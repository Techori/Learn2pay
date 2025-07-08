import React, { useRef, useEffect, useState } from 'react';
import { sendChatbotMessage } from '../../utils/api';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
}

interface ChatbotWindowProps {
  onClose: () => void;
}

const initialMessages: Message[] = [
  { sender: 'bot', text: 'Hello! How can I help you today?', timestamp: Date.now() },
];

// SVGs for avatars
const BotAvatar = () => (
  <span className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-2">
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <circle cx="16" cy="16" r="15" fill="#0A1747" />
      <path d="M6 19c0-5.523 4.477-10 10-10s10 4.477 10 10c0 2.209-1.791 4-4 4H10c-2.209 0-4-1.791-4-4z" fill="white" />
      <rect x="9" y="15" width="14" height="6" rx="3" fill="#0A1747" />
      <circle cx="12" cy="19" r="1.5" fill="#00E6FF" />
      <circle cx="20" cy="19" r="1.5" fill="#00E6FF" />
      <rect x="14" y="5" width="4" height="4" rx="2" fill="white" />
      <circle cx="16" cy="4" r="1" fill="white" />
    </svg>
  </span>
);

const UserAvatar = () => (
  <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full ml-2 overflow-hidden">
    <img src="/user-avatar.png" alt="User" className="w-8 h-8 object-cover" />
  </span>
);

const MIN_HEIGHT = 320; // px
const MAX_HEIGHT = 600; // px
const DEFAULT_HEIGHT = 384; // px (24rem)
const MIN_WIDTH = 320; // px
const MAX_WIDTH = 480; // px
const DEFAULT_WIDTH = 320; // px (20rem)

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [isResizingHeight, setIsResizingHeight] = useState(false);
  const [isResizingWidth, setIsResizingWidth] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const prevMessagesLength = useRef(messages.length);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(DEFAULT_HEIGHT);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(DEFAULT_WIDTH);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Play sound only for new messages (not on initial render)
    if (messages.length > prevMessagesLength.current) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {}); // Handle autoplay restrictions silently
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  // Vertical resize handlers
  const onResizeHeightMouseDown = (e: React.MouseEvent) => {
    setIsResizingHeight(true);
    startYRef.current = e.clientY;
    startHeightRef.current = height;
    document.body.style.cursor = 'ns-resize';
  };
  // Horizontal resize handlers
  const onResizeWidthMouseDown = (e: React.MouseEvent) => {
    setIsResizingWidth(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.body.style.cursor = 'ew-resize';
  };
  useEffect(() => {
    if (!isResizingHeight && !isResizingWidth) return;
    const onMouseMove = (e: MouseEvent) => {
      if (isResizingHeight) {
        const delta = startYRef.current - e.clientY;
        let newHeight = startHeightRef.current + delta;
        newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newHeight));
        setHeight(newHeight);
      }
      if (isResizingWidth) {
        const delta = startXRef.current - e.clientX;
        let newWidth = startWidthRef.current + delta;
        newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
        setWidth(newWidth);
      }
    };
    const onMouseUp = () => {
      setIsResizingHeight(false);
      setIsResizingWidth(false);
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizingHeight, isResizingWidth]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: 'user', text: trimmed, timestamp: Date.now() },
    ]);
    setInput('');
    setIsTyping(true);
    setTimeout(async () => {
      try {
        const res = await sendChatbotMessage(trimmed);
        if (res && res.reply) {
          setMessages((msgs) => [
            ...msgs,
            { sender: 'bot', text: res.reply, timestamp: Date.now() },
          ]);
        } else {
          setMessages((msgs) => [
            ...msgs,
            { sender: 'bot', text: 'Sorry, I could not get a response.', timestamp: Date.now() },
          ]);
        }
      } catch (error) {
        setMessages((msgs) => [
          ...msgs,
          { sender: 'bot', text: 'Sorry, something went wrong.', timestamp: Date.now() },
        ]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed bottom-20 right-6 bg-white shadow-lg rounded-lg flex flex-col z-50 animate-fade-in"
      style={{ height, width }}
      role="dialog"
      aria-modal="true"
      aria-label="Chatbot window"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {/* Vertical resize handle */}
      <div
        className="w-full h-2 cursor-ns-resize flex items-center justify-center"
        style={{ marginTop: '-8px', zIndex: 10 }}
        onMouseDown={onResizeHeightMouseDown}
        title="Drag to resize vertically"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>
      {/* Horizontal resize handle */}
      <div
        className="absolute left-0 top-8 h-[calc(100%-2rem)] w-2 cursor-ew-resize z-20"
        style={{ marginLeft: '-8px' }}
        onMouseDown={onResizeWidthMouseDown}
        title="Drag to resize horizontally"
      />
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
            className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && <BotAvatar />}
            <div
              className={
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-lg px-3 py-2 max-w-[75%] text-sm shadow ml-2'
                  : 'bg-gray-200 text-gray-800 rounded-lg px-3 py-2 max-w-[75%] text-sm shadow mr-2'
              }
              aria-label={msg.sender === 'user' ? 'Your message' : 'Bot message'}
            >
              {msg.text}
              <div className="text-xs mt-1 text-right select-none rounded px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 opacity-80 w-fit ml-auto">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {msg.sender === 'user' && <UserAvatar />}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-end justify-start">
            <BotAvatar />
            <div className="bg-gray-200 text-gray-500 rounded-lg px-3 py-2 max-w-[75%] text-sm shadow mr-2 flex items-center">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
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
      {/* Add audio element for notification sound */}
      <audio ref={audioRef} src="/notify.mp3.wav" preload="auto" />
    </div>
  );
};

export default ChatbotWindow; 