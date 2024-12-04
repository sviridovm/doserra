import { Medication, MedicationIntake } from "@/utils/types";
import { SQLiteDatabase, openDatabaseSync } from "expo-sqlite";
// import * from 'expo-sqlite';

const getMedsFromDate = (item: Date, setMedications: (medications: Medication[]) => void)  => {
    const currentDate = item;
    currentDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const db = openDatabaseSync('medications.db');

    
    const currentDateStr = currentDate.toISOString();
    const nextDateStr = nextDate.toISOString();

    const medList = db.getAllSync<MedicationIntake>('SELECT * FROM medication_intake WHERE intake_time >= ? AND intake_time < ?', [currentDateStr, nextDateStr]);


    
    const medSet = new Set<string>();
    const newMeds: Medication[] = [];
    medList.forEach((med) => {
        // get medication name based on medication_id
        const medication = db.getFirstSync<Medication>('SELECT * FROM medications WHERE id = ?', [med.medication_id]);
        // push back med to newMeds
        if(medication) {
            if (!medSet.has(medication.name)) newMeds.push(medication)
            medSet.add(medication.name);
        }
            
        
    });

    setMedications(newMeds);

    
}

export default getMedsFromDate;