import React, { useRef, useEffect, useState } from "react";
import { sendChatbotMessage } from "../../utils/api";
import { useTheme } from "../../contexts/ThemeContext";
import { X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: number;
}

interface ChatbotWindowProps {
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    sender: "bot",
    text: "Hello! How can I help you today?",
    timestamp: Date.now(),
  },
];

// Enhanced SVGs for avatars that match your theme
const BotAvatar = ({ isDark }: { isDark: boolean }) => (
  <div
    className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
      isDark
        ? "bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg"
        : "bg-gradient-to-br from-orange-400 to-orange-500 shadow-md"
    }`}
  >
    <Bot className={`w-4 h-4 ${isDark ? "text-white" : "text-white"}`} />
  </div>
);

const UserAvatar = ({ isDark }: { isDark: boolean }) => (
  <div
    className={`w-8 h-8 flex items-center justify-center rounded-full ml-3 ${
      isDark
        ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg"
        : "bg-gradient-to-br from-blue-400 to-blue-500 shadow-md"
    }`}
  >
    <User className={`w-4 h-4 ${isDark ? "text-white" : "text-white"}`} />
  </div>
);

const MIN_HEIGHT = 320; // px
const MAX_HEIGHT = 600; // px
const DEFAULT_HEIGHT = 384; // px (24rem)
const MIN_WIDTH = 320; // px
const MAX_WIDTH = 480; // px
const DEFAULT_WIDTH = 320; // px (20rem)

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [isResizingHeight, setIsResizingHeight] = useState(false);
  const [isResizingWidth, setIsResizingWidth] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const prevMessagesLength = useRef(messages.length);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(DEFAULT_HEIGHT);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(DEFAULT_WIDTH);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    document.body.style.cursor = "ns-resize";
  };
  // Horizontal resize handlers
  const onResizeWidthMouseDown = (e: React.MouseEvent) => {
    setIsResizingWidth(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.body.style.cursor = "ew-resize";
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
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizingHeight, isResizingWidth]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: trimmed, timestamp: Date.now() },
    ]);
    setInput("");
    setIsTyping(true);
    setTimeout(async () => {
      try {
        const res = await sendChatbotMessage(trimmed);
        if (res && res.reply) {
          setMessages((msgs) => [
            ...msgs,
            { sender: "bot", text: res.reply, timestamp: Date.now() },
          ]);
        } else {
          setMessages((msgs) => [
            ...msgs,
            {
              sender: "bot",
              text: "Sorry, I could not get a response.",
              timestamp: Date.now(),
            },
          ]);
        }
      } catch (error) {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: "Sorry, something went wrong.",
            timestamp: Date.now(),
          },
        ]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className={`fixed bottom-20 right-6 shadow-2xl rounded-xl flex flex-col z-50 transition-all duration-300 border ${
        isDark
          ? "bg-gray-900 border-gray-700 shadow-orange-500/10"
          : "bg-white border-gray-200 shadow-black/10"
      } ${isMinimized ? "h-14" : ""}`}
      style={{ height: isMinimized ? 56 : height, width }}
      role="dialog"
      aria-modal="true"
      aria-label="Learn2Pay AI Assistant"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {/* Vertical resize handle - only show when not minimized */}
      {!isMinimized && (
        <div
          className={`w-full h-2 cursor-ns-resize flex items-center justify-center ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } rounded-t-xl transition-colors`}
          style={{ marginTop: "-8px", zIndex: 10 }}
          onMouseDown={onResizeHeightMouseDown}
          title="Drag to resize vertically"
        >
          <div
            className={`w-12 h-1.5 rounded-full transition-colors ${
              isDark ? "bg-gray-600" : "bg-gray-300"
            }`}
          />
        </div>
      )}

      {/* Horizontal resize handle - only show when not minimized */}
      {!isMinimized && (
        <div
          className={`absolute left-0 top-8 h-[calc(100%-2rem)] w-2 cursor-ew-resize z-20 ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors`}
          style={{ marginLeft: "-8px" }}
          onMouseDown={onResizeWidthMouseDown}
          title="Drag to resize horizontally"
        />
      )}

      {/* Header */}
      <div
        className={`p-4 border-b font-semibold flex justify-between items-center ${
          isDark
            ? "border-gray-700 text-white bg-gradient-to-r from-gray-800 to-gray-900"
            : "border-gray-200 text-gray-900 bg-gradient-to-r from-orange-50 to-orange-100"
        } rounded-t-xl`}
      >
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isDark ? "bg-orange-400" : "bg-orange-500"
            } animate-pulse`}
          />
          <span
            className={`text-sm font-medium ${
              isDark ? "text-orange-300" : "text-orange-700"
            }`}
          >
            Learn2Pay AI Assistant
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 hover:scale-110 transition-transform",
              isDark ? "hover:bg-gray-700" : "hover:bg-orange-100"
            )}
            aria-label={isMinimized ? "Maximize" : "Minimize"}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 hover:scale-110 transition-transform",
              isDark
                ? "hover:bg-gray-700 hover:text-red-300"
                : "hover:bg-red-50 hover:text-red-600"
            )}
            aria-label="Close Chatbot"
            onClick={onClose}
          >
            <X size={14} />
          </Button>
        </div>
      </div>

      {/* Messages area - hide when minimized */}
      {!isMinimized && (
        <>
          <div
            className={`flex-1 p-4 overflow-y-auto space-y-4 ${
              isDark
                ? "bg-gradient-to-b from-gray-900 to-gray-800"
                : "bg-gradient-to-b from-gray-50 to-white"
            }`}
            id="chatbot-messages"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && <BotAvatar isDark={isDark} />}
                <div className={`relative max-w-[75%] group`}>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg transition-all duration-200 ${
                      msg.sender === "user"
                        ? isDark
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/20"
                          : "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-orange-500/20"
                        : isDark
                        ? "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 shadow-gray-700/20"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-gray-200/20"
                    } ${
                      msg.sender === "user" ? "rounded-br-md" : "rounded-bl-md"
                    }`}
                    aria-label={
                      msg.sender === "user"
                        ? "Your message"
                        : "AI Assistant message"
                    }
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`text-xs mt-1 px-2 opacity-60 transition-opacity group-hover:opacity-80 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    } ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                {msg.sender === "user" && <UserAvatar isDark={isDark} />}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end justify-start">
                <BotAvatar isDark={isDark} />
                <div
                  className={`px-4 py-3 rounded-2xl rounded-bl-md max-w-[75%] text-sm shadow-lg transition-all duration-200 ${
                    isDark
                      ? "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300 shadow-gray-700/20"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 shadow-gray-200/20"
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span
                      className={`w-2 h-2 rounded-full animate-bounce ${
                        isDark ? "bg-orange-400" : "bg-orange-500"
                      }`}
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className={`w-2 h-2 rounded-full animate-bounce ${
                        isDark ? "bg-orange-400" : "bg-orange-500"
                      }`}
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className={`w-2 h-2 rounded-full animate-bounce ${
                        isDark ? "bg-orange-400" : "bg-orange-500"
                      }`}
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form
            className={`p-4 border-t flex gap-3 items-center ${
              isDark
                ? "border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900"
                : "border-gray-200 bg-gradient-to-r from-gray-50 to-white"
            } rounded-b-xl`}
            onSubmit={handleSend}
            aria-label="Send message form"
          >
            <input
              type="text"
              className={`flex-1 border rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                  : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Ask me anything about Learn2Pay..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Type your message"
            />
            <Button
              type="submit"
              size="sm"
              className={cn(
                "p-3 h-auto shadow-lg transition-all duration-300",
                !input.trim() || isTyping
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 active:scale-95 hover:shadow-xl"
              )}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              {isTyping ? (
                <div className="flex items-center space-x-1">
                  <div
                    className="w-1 h-1 rounded-full bg-white animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-1 h-1 rounded-full bg-white animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-1 h-1 rounded-full bg-white animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              ) : (
                <Send
                  size={16}
                  className="transition-transform hover:translate-x-0.5"
                />
              )}
            </Button>
          </form>
        </>
      )}

      {/* Add audio element for notification sound */}
      <audio ref={audioRef} src="/notify.mp3.wav" preload="auto" />
    </div>
  );
};

export default ChatbotWindow;
