import { Medication } from "@/utils/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { View, Pressable } from "react-native";
import MedicationListItem from '@/components/MedicationListItem';
import medicationListStyles from '@/styles/commons';

type props = {
    medications: string[];
    setMedications: (medications: string[]) => void;
}

export default function MedicationList( props: props) {
    const db = useSQLiteContext();
    useEffect(() => {
      async function fetchMedications() {
        const result = await db.getAllAsync<Medication>('SELECT * FROM medications');
        props.setMedications(result.map((medication) => medication.name));
      }
  
      fetchMedications();
    }, []);
  
      return (
        <View style={medicationListStyles.medicationListContainer}>
          {props.medications.map((medication, index) => (
              <MedicationListItem key={index} medication={medication}/>       
          ))} 
        </View>
      );
  
  }
