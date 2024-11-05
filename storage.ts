
import type { UserData } from '../types';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open an SQLite database
const dbPromise = open({
  filename: './user_data.db',
  driver: sqlite3.Database
});

// Initialize the user data table if it doesn't exist
async function initializeDatabase() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      industry TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);
}

initializeDatabase();

// Save user data to the SQLite database
export async function saveUserData(data: UserData): Promise<boolean> {
  try {
    const db = await dbPromise;
    await db.run(`
      INSERT INTO user_data (fullName, email, industry, timestamp)
      VALUES (?, ?, ?, ?)
    `, data.fullName, data.email, data.industry, new Date().toISOString());

    console.log('User data saved to SQLite database.');
    return true;
  } catch (error) {
    console.error('SQLite Storage Error:', error);
    return false;
  }
}

// Retrieve all stored user data
export async function getUserData(): Promise<UserData[]> {
  const db = await dbPromise;
  const rows = await db.all(`SELECT * FROM user_data`);
  return rows.map(row => ({
    fullName: row.fullName,
    email: row.email,
    industry: row.industry,
    timestamp: row.timestamp,
  }));
}
