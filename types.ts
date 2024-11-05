export interface UserData {
  fullName: string;
  email: string;
  industry: string;
}

export interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
}

export interface Assessment {
  score: number;
  analysis: string;
  recommendations: string[];
}