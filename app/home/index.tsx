import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { Medication } from '../../utils/types';
import { initDatabase } from '@/hooks/initDatabase';
import MedicationList from '@/components/MedicationList';
import styles from '@/styles/commons';
import ModalStyles from '@/styles/commons';
import AddMedicationModal from '@/components/AddMedicationModal';
import FloatingButton from '@/components/FloatingButton';
import { defaultMedication } from '@/utils/types';

// const defaultMedication: Medication = {name: '', dosage: 0, startDate: String(new Date()), endDate: String(new Date()), username: '', id: -1}

export default function HomeScreen() {

  
  const [medications, setMedications] = useState<Medication[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMedication, setNewMedication] = useState<Medication>(defaultMedication);
  const [pickerMode, setPickerMode] = useState('date');

  
  // const handleAddMedication = (db: SQLite.SQLiteDatabase) => {

  //   setMedications((prevMedications) => [...prevMedications, newMedication]);
  //   setNewMedication(defaultMedication);
  //   setModalVisible(false);

  //   db.runSync('INSERT INTO medications (name, dosage, start_date, end_date, username) VALUES (?, ?, ?, ?, ?)', 
  //     [newMedication.name, newMedication.dosage, newMedication.startDate, newMedication.endDate, newMedication.username]);
  

  // };
  
  return (
    <GestureHandlerRootView>
    <ScrollView contentContainerStyle={styles.container}>
    <SQLiteProvider databaseName='medications.db' onInit={initDatabase}>
    <SafeAreaView style={styles.medicationContainer}>
        <Text style={styles.title}>Medications</Text> 
        <MedicationList medications={medications} setMedications={setMedications} username='1'/>

        <AddMedicationModal 
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setMedications={setMedications}
        />

        <FloatingButton onPress={setModalVisible} />


    </SafeAreaView>
    </SQLiteProvider>
    </ScrollView>
    </GestureHandlerRootView>
  );
}







 

