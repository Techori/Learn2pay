import { RequestHandler } from 'express';

export const postChatMessage: RequestHandler = (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required.' });
    return;
  }
  // Mock reply logic
  const mockReplies = [
    "I'm here to help!",
    "Could you please provide more details?",
    "That's interesting! Tell me more.",
    "Let me look into that for you.",
    "I'm just a mock bot, but I'm learning fast!",
    "How can I assist you further?",
    "Thank you for reaching out!",
  ];
  const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
  res.json({ reply });
}; 