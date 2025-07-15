import { RequestHandler } from 'express';
import { knowledgeBase } from '../knowledgeBase';
import { embedText, cosineSimilarity } from '../utils/embedding';
import { askGemini } from '../utils/gemini';

const SYSTEM_PROMPT = `You are a support assistant for Learn2Pay. Only answer questions about Learn2Pay, its features, pricing, registration, and support. If a question is not related, politely decline.`;

const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];

export const postChatMessage: RequestHandler = async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required.' });
    return;
  }
  // Greeting/fallback logic
  if (greetings.includes(message.trim().toLowerCase())) {
    res.json({ reply: 'Hello! How can I help you with Learn2Pay today?' });
    return;
  }
  // Embed user message (real embedding)
  let userVec: number[];
  try {
    userVec = await embedText(message);
  } catch (err) {
    res.json({ reply: 'Sorry, something went wrong with the embedding service.' });
    return;
  }
  // Embed all knowledge chunks (real embedding, no cache for now)
  let chunkVecs: number[][];
  try {
    chunkVecs = await Promise.all(knowledgeBase.map(chunk => embedText(chunk.text)));
  } catch (err) {
    res.json({ reply: 'Sorry, something went wrong with the embedding service.' });
    return;
  }
  // Score and sort
  const scored = knowledgeBase.map((chunk, i) => ({
    chunk,
    score: cosineSimilarity(userVec, chunkVecs[i]),
  }));
  scored.sort((a, b) => b.score - a.score);
  // Guardrail: If no chunk is relevant enough, return a polite message
  if (scored[0].score < 0.5) {
    res.json({ reply: 'Sorry, I can only answer questions about Learn2Pay and its features.' });
    return;
  }
  // Take top 3 chunks as context
  const topChunks = scored.slice(0, 3).map(s => s.chunk.text);
  const context = topChunks.map((c, i) => `${i + 1}. ${c}`).join('\n');
  const prompt = `${SYSTEM_PROMPT}\nContext:\n${context}\nUser: ${message}`;
  try {
    const reply = await askGemini(prompt);
    res.json({ reply });
  } catch (err) {
    res.json({ reply: 'Sorry, something went wrong with the AI service.' });
  }
}; 