import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Login } from './components/Login';
import { Chat } from './components/Chat';
import type { UserData, Assessment } from './types';
import { validateConfig } from './config';

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [configValid, setConfigValid] = useState(true);

  useEffect(() => {
    setConfigValid(validateConfig());
  }, []);

  const handleAssessmentComplete = (assessment: Assessment) => {
    setAssessment(assessment);
    // Redirect to your website after a short delay
    setTimeout(() => {
      window.location.href = 'https://ai-systems-for-b2b-found-dj8hotk.gamma.site/';
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      {!userData && <Login onComplete={setUserData} />}
      
      {userData && !assessment && (
        <Chat onComplete={handleAssessmentComplete} />
      )}
      
      {assessment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Your AI Readiness Assessment</h2>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium">AI Readiness Score</span>
              <span className="text-2xl font-bold text-blue-600">{assessment.score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
                style={{ width: `${assessment.score}%` }}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Analysis</h3>
            <p className="text-gray-600">{assessment.analysis}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Recommended Automations</h3>
            <ul className="space-y-2">
              {assessment.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="mt-8 text-center text-gray-500">
            Redirecting you to our website in a few seconds...
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default App;