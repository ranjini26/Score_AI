import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import type { ChatMessage, Assessment } from '../types';
import { analyzeResponses } from '../services/openai';

interface ChatProps {
  onComplete: (assessment: Assessment) => void;
}

const questions = [
  "What are your main business processes that take up most of your time?",
  "How many hours per week does your team spend on manual data entry or repetitive tasks?",
  "What software tools does your company currently use?",
  "What's your biggest operational challenge right now?"
];

export function Chat({ onComplete }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'assistant', content: "Hi! I'm your AI Advisor. Let's analyze your business for automation opportunities. " + questions[0] }
  ]);
  const [input, setInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', content: input }];
    const newResponses = [...responses, input];
    setMessages(newMessages);
    setResponses(newResponses);
    setInput('');

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setMessages([...newMessages, { 
          type: 'assistant', 
          content: questions[currentQuestion + 1]
        }]);
        setCurrentQuestion(currentQuestion + 1);
      }, 1000);
    } else if (currentQuestion === questions.length - 1) {
      try {
        const assessment = await analyzeResponses(newResponses);
        onComplete(assessment);
      } catch (error) {
        console.error('Error analyzing responses:', error);
        // Fallback assessment if API fails
        onComplete({
          score: 75,
          analysis: "Based on your responses, your organization shows strong potential for AI implementation.",
          recommendations: [
            "Implement RPA for data entry tasks",
            "Deploy AI-powered document processing",
            "Integrate predictive analytics"
          ]
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">AI Advisor Chat</h2>
        </div>
      </div>

      <div className="h-[400px] overflow-y-auto p-6">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 ${message.type === 'user' ? 'text-right' : ''}`}
          >
            <div
              className={`inline-block p-4 rounded-lg max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}