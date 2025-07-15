import { Router } from 'express';
import { postChatMessage } from '../controllers/chatbotController';

const router = Router();

// POST /api/chatbot/message
router.post('/message', postChatMessage);

export default router; 