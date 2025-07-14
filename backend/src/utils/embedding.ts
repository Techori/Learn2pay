// Real embedding and similarity utilities for in-memory RAG

export async function embedText(text: string): Promise<number[]> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
  const EMBEDDING_API_URL = 'https://generativelanguage.googleapis.com/v1/models/text-embedding-004:embedContent';
  if (!GEMINI_API_KEY) throw new Error('Gemini API key not set');
  const body = {
    content: {
      parts: [{ text }]
    }
  };
  try {
    const res = await fetch(`${EMBEDDING_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data: any = await res.json();
    if (!res.ok) throw new Error('Gemini Embedding API error');
    // Log and extract the embedding vector
    const vector = data?.embedding?.values || data?.embedding?.[0]?.values;
    if (!vector) throw new Error('No embedding vector returned');
    return vector;
  } catch (err) {
    console.error('Gemini Embedding API error:', err);
    throw err;
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (normA * normB);
} 