import * as SQLite from 'expo-sqlite'

export const db = SQLite.openDatabaseSync('kcal.db')

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS meals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      kcal INTEGER NOT NULL,
      date TEXT NOT NULL,
      protein INTEGER NOT NULL,
      carbs INTEGER NOT NULL,
      fat INTEGER NOT NULL
    );
  `)
}