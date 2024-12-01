import SQLite from 'expo-sqlite';


export const initDatabase = async(db: SQLite.SQLiteDatabase) => {
    // delete the tables if they already exist
    // await db.execAsync(`DROP TABLE IF EXISTS medications;`);
    try {
        await db.execAsync(`
            
            CREATE TABLE IF NOT EXISTS medications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                dosage INTEGER NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                username TEXT NOT NULL
            );
        `);
  
  
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);
        console.log('Database initialized !');
    } catch (error) {
        console.log('Error while initializing the database : ', error);
    }
  };
  