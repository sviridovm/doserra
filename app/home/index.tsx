import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { Medication } from '../../utils/types';
import { initDatabase } from '@/hooks/initDatabase';
import { StatusBar } from 'expo-status-bar';
import styles from '@/styles/commons';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';




export default function HomeScreen() {

  
  const [medications, setMedications] = useState<string[]>([]);
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
    <ScrollView contentContainerStyle={floatingButtonStyle.container}>
    <SQLiteProvider databaseName='medications.db' onInit={initDatabase}>
    <SafeAreaView style={{flex: 1}}>
        <Text style={styles.title}>Medications</Text> 
      <Content medications={medications} setMedications={setMedications}/>

      <AddMedicationModal 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newMedication={newMedication}
        setNewMedication={setNewMedication}
        dosage={dosage}
        setDosage={setDosage}
        handleAddMedication={handleAddMedication}

      />

      <View style={floatingButtonStyle.floatingButtonContainer}>
      <AddMedicationButton setModalVisible={setModalVisible} />
      </View>


      {/* </SQLiteProvider> */}
    </SafeAreaView>
    </SQLiteProvider>
    </ScrollView>
    </GestureHandlerRootView>
  );
}


type addMedicationModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  newMedication: string;
  setNewMedication: (medication: string) => void;
  dosage: string;
  setDosage: (dosage: string) => void;
  handleAddMedication: (db: SQLite.SQLiteDatabase) => void;
}

const AddMedicationModal = (props: addMedicationModalProps ) => {
  const db = useSQLiteContext();
  
  // useEffect(() => {
  // db.runSync("DROP TABLE medications")
  // }, []);

  return (
    <Modal
        visible={props.modalVisible}
        animationType='slide'
        transparent={false}
        onRequestClose={() => props.setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <SafeAreaView>
            <TextInput
              placeholder='Medication Name'
              onChangeText={(text) => props.setNewMedication(text)}
              value={props.newMedication}
              style={styles.input}
              autoFocus={true}
            />

            <TextInput
              placeholder='Dosage'
              keyboardType='numeric'
              onChangeText={(text) => props.setDosage(text)}
              style={styles.input}
            />

            <TextInput
              placeholder='End Date'
              // keyboardType='text'
              onChangeText={(text) => props.setDosage(text)}
              style={styles.input}
            />

            <Button
              title='Add'
              onPress={() => props.handleAddMedication(db)}
              disabled={!props.newMedication}
            />
            
            <Button
              title='Cancel'
              onPress={() => {
                props.setNewMedication('');
                props.setModalVisible(false);
              }}
            />
            
          </SafeAreaView>
        </SafeAreaView>


      </Modal>

  )

}


type ContentProps = {
  medications: string[];
  setMedications: (medications: string[]) => void;
}
 
export function Content( props: ContentProps) {
  const db = useSQLiteContext();
  useEffect(() => {
    async function fetchMedications() {
      const result = await db.getAllAsync<Medication>('SELECT * FROM medications');
      props.setMedications(result.map((medication) => medication.name));
    }

    fetchMedications();
  }, []);

  return (
    <View style={styles.contentContainer}>
      {props.medications.map((medication_name, index) => (
        <View key={index} style={styles.medication}>
          <Button
        title={medication_name}
        onPress={() => {
          router.push({
            pathname: '/details/[medication]',
            params: { medication: medication_name },
          });
        }}
      />
        </View>
      ))} 
    </View>
  );

}

type addMedicationButtonProps = {
  setModalVisible: (visible: boolean) => void;
}

const AddMedicationButton = (
  props: addMedicationButtonProps
) => {
  return (
    <TouchableOpacity
      style={floatingButtonStyle.floatingButton}
      onPress={() => props.setModalVisible(true)}>
        <Text style={floatingButtonStyle.floatingButtonIcon}>+</Text>
    </TouchableOpacity>
  )
}

const floatingButtonStyle = StyleSheet.create({
  floatingButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  floatingButton: {
    // marginBottom: 1,
    // marginRight: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonIcon: {
    color: 'white',
    fontSize: 30,
  },
});