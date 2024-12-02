import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Medication, defaultMedication } from '../../utils/types';
// import { styles } from '@/styles/commons';

export default function DetailsScreen() {
  const medicationJSON = useLocalSearchParams().medication?.toString();
  console.log('----------------------------')
  console.log(medicationJSON);
  const medication = JSON.parse(medicationJSON) as Medication;
  // console.log(medication);
  // const medication = medicationJSON;
  
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SQLiteProvider databaseName='medications.db'>
          <SafeAreaView style={styles.container}>
            {/* <MedicationDetails medication={medication}/> */}
            <MedicationDetails {...medication}/>
          </SafeAreaView>
        </SQLiteProvider>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

  
interface MedicationIntake {
  id: number;
  medication_id: number;
  intake_time: string;
  taken: boolean;
}

const MedicationDetails = (medication: Medication) => {
  // !PLACEHOLDER
  const username = '1';
  const db = useSQLiteContext();
  const [intakes, setIntakes] = useState<MedicationIntake[]>([]);

  useEffect(() => {
    const fetchIntakes = async() => {
      try {
        // TODO: REMOVE
        // insert intakes
        for(let i = 0; i < 10; i++) {
          const date = new Date()
          date.setHours(new Date().getHours() + (12 * i))
          await db.runAsync('INSERT INTO medication_intake (medication_id, intake_time, taken) VALUES (?, ?, ?)', [medication.id, date.toISOString(), false]);
        }

        const intakes = await db.getAllAsync<MedicationIntake>('SELECT * FROM medication_intake WHERE medication_id = ?', [medication.id]);
        setIntakes(intakes);
      } catch (error) {
        console.log('Error while fetching intakes : ', error);
      }
    }
    fetchIntakes();
  }, []);


  const getBackgroundColor = (intake: MedicationIntake) => {
    const intakeDate = new Date(intake.intake_time);
    const now = new Date();

    if (intakeDate > now) {
      return '#ccc'; // Grey for future intake
    }
    return intake.taken ? '#4CAF50' : '#F44336'; // Green if taken, Red if missed
  };

  return (
    <View>
      <View>
        <Text>{medication.name}</Text>
      </View>

      <Text>Dosage: {medication.dosage}</Text>
      <Text></Text>

      <View style={styles.grid}>
        {intakes.map((intake, index) => (
          <View
            key={intake.id}
            style={[styles.gridItem, { backgroundColor: getBackgroundColor(intake) }]}
          >
            <Text style={styles.intakeText}>{new Date(intake.intake_time).toLocaleDateString()}</Text>
            <Text style={styles.intakeText}>{new Date(intake.intake_time).toLocaleTimeString()}</Text>
          </View>
        ))}
      </View>


      <Pressable onPress={() => router.replace('/home')}>
        <Text >Back</Text>
      </Pressable>

      
    </View>
  )

}

export function CountdownTimer() {
  const medication = String(useLocalSearchParams());
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '18%', // Fits 10 items per row with spacing
    aspectRatio: 1, // Makes the items square
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 8,
    padding: 5,
  },
  intakeText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});