import SQLite from 'expo-sqlite';


export const initDatabase = async(db: SQLite.SQLiteDatabase) => {
    // delete the tables if they already exist
    // db.execSync(`
    //     DROP TABLE IF EXISTS users;
    //     DROP TABLE IF EXISTS medications;
    //     DROP TABLE IF EXISTS medication_intake;
    //     `);

    try {

        db.execSync(`PRAGMA foreign_keys = ON;`);

        db.execSync(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                salt TEXT NOT NULL,
                password TEXT NOT NULL
            );
        `);


         db.execSync(`
            CREATE TABLE IF NOT EXISTS medications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                dosage INTEGER NOT NULL,
                interval INTEGER NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                username TEXT NOT NULL,
                FOREIGN KEY(username) REFERENCES users(username)
            );
        `);
  
        db.execSync(`
            CREATE TABLE IF NOT EXISTS medication_intake (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                medication_id INTEGER NOT NULL,
                intake_time TEXT NOT NULL,
                taken BOOLEAN NOT NULL,
                FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
            );
        `);

        console.log('Database initialized !');
    } catch (error) {
        console.log('Error while initializing the database : ', error);
    }
  };
  