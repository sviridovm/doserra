import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Medication, defaultMedication } from '../../utils/types';
import { styles } from '@/styles/commons';

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

const MedicationDetails = (medication: Medication) => {


  // !PLACEHOLDER
  const username = '1';

  return (
    <View>
      <Text>Medication: {medication.name}</Text>
      <Text>Dosage: {medication.dosage}</Text>
      {/* <Text>Start Date: {medication.startDate}</Text> */}

      

      <Pressable style={styles.button} onPress={() => router.replace('/home')}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>

      
    </View>
  )

}

export function CountdownTimer() {
  const medication = String(useLocalSearchParams());
}

