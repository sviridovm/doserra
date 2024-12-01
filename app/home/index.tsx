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

export default function HomeScreen() {

  
  const [medications, setMedications] = useState<string[]>(['Aspirin', 'coochie', 'buns']);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMedication, setNewMedication] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState('date');
  const [dosage, setDosage] = useState<string>('');
  const [test, setTest] = useState('');

  
  const handleAddMedication = (db: SQLite.SQLiteDatabase) => {

    setMedications((prevMedications) => [...prevMedications, newMedication]);
    setNewMedication('');
    setModalVisible(false);

    db.runSync('INSERT INTO medications (name, dosage, start_date, end_date, username) VALUES (?, ?, ?, ?, ?)', 
      [newMedication, dosage, String(startDate), String(endDate), '1']);
  

  };
  
  return (
    <GestureHandlerRootView>
    <ScrollView contentContainerStyle={styles.container}>
    <SQLiteProvider databaseName='medications.db' onInit={initDatabase}>
    <SafeAreaView style={styles.medicationContainer}>
        <Text style={styles.title}>Medications</Text> 
        <MedicationList medications={medications} setMedications={setMedications}/>

        <AddMedicationModal 
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          newMedication={newMedication}
          setNewMedication={setNewMedication}
          dosage={dosage}
          setDosage={setDosage}
          handleAddMedication={handleAddMedication}
        />

        <FloatingButton onPress={setModalVisible} />


    </SafeAreaView>
    </SQLiteProvider>
    </ScrollView>
    </GestureHandlerRootView>
  );
}







 

