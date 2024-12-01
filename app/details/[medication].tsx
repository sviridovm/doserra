import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Medication } from '../../utils/types';
import styles from '@/styles/commons';

export default function DetailsScreen() {
  const medication = useLocalSearchParams();
  console.log(medication);
  
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SQLiteProvider databaseName='medications.db'>
          <SafeAreaView style={styles.container}>
            <MedicationDetails />
          </SafeAreaView>
        </SQLiteProvider>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const MedicationDetails = () => {
  const db = useSQLiteContext();
  const medication = String(useLocalSearchParams()[0]);
  console.log(medication);


  // !PLACEHOLDER
  const username = '1';
  const [endDate, setEndDate] = useState(new Date());
  const [dosage, setDosage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [timeUnits, setTimeUnits] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

  useEffect( () => {
    async function fetchMedicationData() {
      const query = 'SELECT * FROM medications WHERE name = ? AND username = ?';
      const all = db.getAllSync(query, [medication, username]) as QueryResult[];
      console.log(all);
      const result = all[0];  

      if (result) {
        setEndDate(new Date(result.end_date));
        setDosage(result.dosage);
        setStartDate(new Date(result.start_date));
      } 
      
    }
    fetchMedicationData();
  }, []);

  return (
    <View>
      <Text>Medication: {medication}</Text>
      <Text>Dosage: {dosage}</Text>
      <Text>Start Date: {startDate.toDateString()}</Text>

      <Pressable style={styles.button} onPress={() => router.replace('/home')}>
                <Text style={styles.buttonText} >Back</Text>
      </Pressable>

      
    </View>
  )

}

type QueryResult = {
  id: number;
  name: string;
  dosage: number;
  start_date: string;
  end_date: string;
  username: string;
}

export function CountdownTimer() {
  const medication = String(useLocalSearchParams());
}

