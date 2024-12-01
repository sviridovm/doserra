import { Medication } from "@/utils/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { View, Pressable } from "react-native";
import MedicationListItem from '@/components/MedicationListItem';
import medicationListStyles from '@/styles/commons';

type props = {
    medications: Medication[];
    setMedications: (medications: Medication[]) => void;
    username: string;
}

export default function MedicationList( props: props) {
    const db = useSQLiteContext();
    useEffect(() => {
      async function fetchMedications() {
        const result = await db.getAllAsync<Medication>('SELECT * FROM medications where username = ?', [props.username]);
        props.setMedications(result);
      }
  
      fetchMedications();
    }, []);
  
      return (
        <View style={medicationListStyles.container}>
          {props.medications.map((medication, index) => (
              <MedicationListItem key={index} medication={medication}/>       
          ))} 
        </View>
      );
  
  }
