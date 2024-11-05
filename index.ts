export interface UserData {
  fullName: string;
  email: string;
  industry: string;
  timestamp?: string;
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

export interface APIError {
  message: string;
  code?: string;
  status?: number;
}