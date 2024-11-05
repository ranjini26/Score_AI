import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { saveUserData } from '../services/storage';
import type { UserData } from '../types';

interface LoginProps {
  onComplete: (data: UserData) => void;
}

export function Login({ onComplete }: LoginProps) {
  const [formData, setFormData] = useState<UserData>({
    fullName: '',
    email: '',
    industry: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const success = await saveUserData(formData);
      
      if (!success) {
        throw new Error('Failed to save data. Please try again.');
      }

      onComplete(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 rounded-2xl bg-white shadow-xl"
    >
      <div className="flex items-center justify-center mb-8">
        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
          <Bot className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-2">Welcome to AI Advisor</h1>
      <p className="text-gray-600 text-center mb-8">
        Let's discover AI opportunities for your business
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            disabled={isSubmitting}
          >
            <option value="">Select your industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-all ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Start Assessment'}
        </button>
      </form>
    </motion.div>
  );
}