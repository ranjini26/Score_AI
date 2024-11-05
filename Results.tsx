import React from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import type { Assessment } from '../types';

interface ResultsProps {
  assessment: Assessment;
}

export function Results({ assessment }: ResultsProps) {
  const handleRedirect = () => {
    window.location.href = 'https://your-website.com';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Award className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {assessment.score}/100
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Your AI Readiness Score</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Analysis</h3>
        <p className="text-gray-600">{assessment.analysis}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Recommended Automations</h3>
        <div className="space-y-4">
          {assessment.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-gray-50"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {index + 1}
              </div>
              <p className="flex-1">{rec}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={handleRedirect}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        Learn More About Our Services
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}