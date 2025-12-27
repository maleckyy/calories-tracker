import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('kcal.db')
export const userId = 'main_user'
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

  db.execSync(`
    CREATE TABLE IF NOT EXISTS saved_meals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      kcal INTEGER NOT NULL,
      protein INTEGER NOT NULL,
      carbs INTEGER NOT NULL,
      fat INTEGER NOT NULL
    );
  `)

  db.execSync(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    birthDate TEXT,
    
    calorieRequirement INTEGER NOT NULL,
    proteinRequirement INTEGER NOT NULL,
    carbsRequirement INTEGER NOT NULL,
    fatRequirement INTEGER NOT NULL,
    waterGoal INTEGER NOT NULL,
    
    gender TEXT CHECK(gender IN ('male', 'female', 'other')),
    weight REAL NOT NULL,
    height REAL NOT NULL,
    goal TEXT CHECK(goal IN ('loseWeight', 'maintain', 'gainMuscle'))
  );
`);

  db.execSync(`
  CREATE TABLE IF NOT EXISTS hydration (
    id TEXT PRIMARY KEY,
    waterAmount INTEGER NOT NULL,
    date TEXT NOT NULL
  );
`);

  const userCount = db.getFirstSync<{ count: number }>('SELECT COUNT(*) as count FROM user');

  if (userCount?.count === 0) {
    db.runSync(`
      INSERT INTO user (
        id, username, birthDate, 
        calorieRequirement, proteinRequirement, carbsRequirement, fatRequirement, 
        waterGoal, gender, weight, height, goal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, 'User', '2000-01-01',
        2000, 150, 250, 70,
        2000, 'other', 70, 170, 'maintain'
      ]
    );
  }
}