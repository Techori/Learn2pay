import React, { useState } from "react";
import ChatbotWindow from "./ChatbotWindow";
import { useTheme } from "../../contexts/ThemeContext";
import { MessageCircle, X, Bot, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";

const ChatbotButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {open && <ChatbotWindow onClose={() => setOpen(false)} />}

      {/* Floating Action Button using shadcn Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Main Chatbot Button */}
          <Button
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "relative h-14 w-14 rounded-full p-0 shadow-2xl transition-all duration-300",
              "hover:scale-110 active:scale-95",
              open && "rotate-180",
              isDark ? "shadow-orange-500/25" : "shadow-orange-500/20"
            )}
            variant="default"
            aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
          >
            {/* Icon with smooth transition */}
            <div className="relative flex items-center justify-center">
              {open ? (
                <X className="h-6 w-6 transition-all duration-300" />
              ) : (
                <Bot className="h-6 w-6 transition-all duration-300" />
              )}
            </div>

            {/* Pulse animation overlay */}
            <div
              className={cn(
                "absolute inset-0 rounded-full animate-pulse",
                isDark ? "bg-orange-400/20" : "bg-orange-500/20"
              )}
            />
          </Button>

          {/* Online Status Badge */}
          {!open && (
            <Badge
              variant="default"
              className={cn(
                "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center",
                "bg-green-500 hover:bg-green-600 border-2 border-white",
                "animate-pulse"
              )}
            >
              <div className="h-2 w-2 rounded-full bg-white" />
            </Badge>
          )}

          {/* Notification Badge */}
          {!open && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -left-2 h-6 w-6 p-0 flex items-center justify-center text-xs font-bold animate-bounce"
            >
              <MessageCircle className="h-3 w-3" />
            </Badge>
          )}
        </div>

        {/* Helper Tooltip */}
        {!open && (
          <div
            className={cn(
              "absolute bottom-16 right-0 mb-2 opacity-0 group-hover:opacity-100",
              "transition-all duration-300 pointer-events-none",
              "px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap",
              "shadow-lg border",
              isDark
                ? "bg-gray-800 text-gray-200 border-gray-700"
                : "bg-white text-gray-800 border-gray-200"
            )}
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span>Need help? Ask our AI Assistant!</span>
            </div>

            {/* Tooltip arrow */}
            <div
              className={cn(
                "absolute top-full left-1/2 -translate-x-1/2",
                "w-2 h-2 rotate-45 border-b border-r",
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              )}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatbotButton;
