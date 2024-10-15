import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Medication } from '../../utils/types';


export default function DetailsScreen() {
    const { medication } = useLocalSearchParams();
    
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SQLiteProvider databaseName='medications.db'>
          <SafeAreaView style={styles.container}>
          </SafeAreaView>
        </SQLiteProvider>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export function MedicationDetails() {
  const db = useSQLiteContext();
  const medication = String(useLocalSearchParams());
  const [endDate, setEndDate] = useState(new Date());
  const [dosage, setDosage] = useState('');
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
      // const result = await db.runAsync('SELECT * FROM medications WHERE name = ?', [medication]);
      const statement = await db.prepareAsync('SELECT * FROM medications WHERE name = ?');
      try {
        const result = await statement.executeAsync<Medication>({ name: medication});
        // setEndDate(result.endDate);
        
        for await (const row of result) {
          setEndDate(row.endDate);
          setDosage(row.dosage);
          setStartDate(row.startDate);
          break;
        }

        
      } finally {
        await statement.finalizeAsync();
      }
      
      fetchMedicationData();

    }
  }, []);

  return (
    <View>
      <Text>Medication: {medication}</Text>
      <Text>Dosage: {dosage}</Text>
      <Text>Start Date: {startDate.toDateString()}</Text>
    </View>
  )

}


export function CountdownTimer() {
  const medication = String(useLocalSearchParams());
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
