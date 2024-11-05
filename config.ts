export const OPENAI_API_KEY = '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';

export const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: '1Urle7ceNTNkSapEHwZ9TVZbpjnXolf8R7Pnmmc32fLM',
  clientEmail: 'score-ai@content-automations-426408.iam.gserviceaccount.com',
  // Make sure to format the private key correctly with actual newlines
  privateKey: `d2707cb7c57b35c530977bf826ee732214a108c0`,
};

// Validate configuration at runtime
export function validateConfig() {
  const missingConfig = [];
  
  if (!OPENAI_API_KEY || OPENAI_API_KEY === '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') {
    missingConfig.push('OpenAI API Key');
  }
  
  if (!GOOGLE_SHEETS_CONFIG.spreadsheetId || 
      GOOGLE_SHEETS_CONFIG.spreadsheetId === '1Urle7ceNTNkSapEHwZ9TVZbpjnXolf8R7Pnmmc32fLM') {
    missingConfig.push('Google Sheets ID');
  }
  
  if (!GOOGLE_SHEETS_CONFIG.clientEmail || 
      GOOGLE_SHEETS_CONFIG.clientEmail === 'score-ai@content-automations-426408.iam.gserviceaccount.com') {
    missingConfig.push('Google Service Account Email');
  }
  
  if (!GOOGLE_SHEETS_CONFIG.privateKey || 
      GOOGLE_SHEETS_CONFIG.privateKey.includes('d2707cb7c57b35c530977bf826ee732214a108c0')) {
    missingConfig.push('Google Service Account Private Key');
  }
  
  if (missingConfig.length > 0) {
    console.warn('Missing configuration:', missingConfig.join(', '));
    return false;
  }
  
  return true;
}