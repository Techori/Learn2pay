
import React, { useState } from 'react';

export const useChatbot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  const openChatbot = () => {
    setIsChatbotOpen(true);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  return {
    isChatbotOpen,
    toggleChatbot,
    openChatbot,
    closeChatbot
  };
};
