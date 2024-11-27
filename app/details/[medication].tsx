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
            <MedicationDetails />
          </SafeAreaView>
        </SQLiteProvider>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const MedicationDetails = () => {
  const db = useSQLiteContext();
  const medication = String(useLocalSearchParams());
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
    function fetchMedicationData() {
      console.log('here');
      const result = db.getFirstSync<QueryResult>('SELECT * FROM medications WHERE name = ? AND username = ?', [medication, '1']);  

      if (result) {
        setEndDate(new Date(result.end_date));
        setDosage(result.dosage);
        setStartDate(new Date(result.start_date));
      } 
      console.error("penus");
      console.error(result);
      
    }
      
    fetchMedicationData();
  }, []);

  return (
    <View>
      <Text>Medication: {medication}</Text>
      <Text>Dosage: {dosage}</Text>
      <Text>Start Date: {startDate.toDateString()}</Text>
    </View>
  )

}

type QueryResult = {
  end_date: string;
  dosage: number;
  start_date: string;
  medication: string;
  username: string;
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
