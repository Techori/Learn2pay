// Gemini API utility

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';

export async function askGemini(prompt: string): Promise<string> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
  console.log('Gemini API Key:', GEMINI_API_KEY ? 'SET' : 'NOT SET');
  console.log('Gemini prompt:', prompt);
  if (!GEMINI_API_KEY) throw new Error('Gemini API key not set');
  const body = {
    contents: [
      { parts: [{ text: prompt }] }
    ]
  };
  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data: any = await res.json();
    console.log('Gemini raw response:', data);
    if (!res.ok) throw new Error('Gemini API error');
    // Extract the reply text
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not get a response.';
  } catch (err) {
    console.error('Gemini API error:', err);
    throw err;
  }
} 