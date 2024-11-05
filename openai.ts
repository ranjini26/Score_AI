import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeResponses(responses: string[]): Promise<{
  score: number;
  analysis: string;
  recommendations: string[];
}> {
  const prompt = `Analyze these business responses for AI automation potential:
    ${responses.join('\n')}
    
    Provide:
    1. AI Readiness Score (0-100)
    2. Brief analysis
    3. Three specific automation recommendations`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  const content = completion.choices[0].message.content || '';
  
  // Parse the response - this is a simple implementation
  const lines = content.split('\n');
  const score = parseInt(lines[0]) || 75; // fallback score
  const analysis = lines[1] || 'Your business shows potential for AI implementation.';
  const recommendations = lines.slice(2, 5).map(line => line.trim()).filter(Boolean);

  return {
    score,
    analysis,
    recommendations: recommendations.length ? recommendations : [
      "Implement RPA for data entry tasks",
      "Deploy AI-powered document processing",
      "Integrate predictive analytics"
    ]
  };
}