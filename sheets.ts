import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { GOOGLE_SHEETS_CONFIG } from '../config';
import type { UserData, APIError } from '../types';

class SheetsError extends Error {
  constructor(message: string, public details?: APIError) {
    super(message);
    this.name = 'SheetsError';
  }
}

export async function saveToSheet(data: UserData): Promise<boolean> {
  try {
    if (!GOOGLE_SHEETS_CONFIG.spreadsheetId || 
        !GOOGLE_SHEETS_CONFIG.clientEmail || 
        !GOOGLE_SHEETS_CONFIG.privateKey) {
      throw new SheetsError('Missing Google Sheets configuration');
    }

    const jwt = new JWT({
      email: GOOGLE_SHEETS_CONFIG.clientEmail,
      key: GOOGLE_SHEETS_CONFIG.privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEETS_CONFIG.spreadsheetId, jwt);
    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({ headerValues: ['timestamp', 'fullName', 'email', 'industry'] });
    }

    const rowData = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      industry: data.industry,
    };

    await sheet.addRow(rowData);
    return true;

  } catch (error) {
    console.error('Google Sheets Error:', error);
    
    const apiError: APIError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      code: error instanceof SheetsError ? 'SHEETS_ERROR' : 'UNKNOWN_ERROR',
    };

    // In production, you might want to send this to an error tracking service
    console.error('Detailed error:', apiError);
    
    // Don't throw, return false to indicate failure
    return false;
  }
}