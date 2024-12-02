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
                FOREIGN KEY(username) REFERENCES users(username)
            );
        `);
  
  
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS medication_intake (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                medication_id INTEGER NOT NULL,
                intake_time TEXT NOT NULL,
                taken BOOLEAN NOT NULL,
                FOREIGN KEY(medication_id) REFERENCES medications(id)
                );
        `);

        console.log('Database initialized !');
    } catch (error) {
        console.log('Error while initializing the database : ', error);
    }
  };
  