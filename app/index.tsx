import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Medication } from '../utils/types';


// const loadDatabase = async () => {
//   const dbName = 'medications.db';
//   const dbAsset = require('doserra/assets/medications.db');
//   const dbURI = Asset.fromModule(dbAsset).uri;
//   const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

//   const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
//   if(!fileInfo.exists) {
//     await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
//     await FileSystem.downloadAsync(dbURI, dbFilePath);
//   } 

// }




export default function HomeScreen() {
  // const db = SQLite.importDatabaseFromAssetAsync(require('doserra/assets/medications.db'));
  const db = SQLite.openDatabaseSync('medications.db');

  
  const [medications, setMedications] = useState<string[]>(['Aspirin', 'coochie', 'buns']);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMedication, setNewMedication] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState('date');
  const [dosage, setDosage] = useState<string>('');
  const [test, setTest] = useState('');

  useEffect(() => {
    db.execSync('CREATE TABLE IF NOT EXISTS medications (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, dosage TEXT NOT NULL, startDate TEXT NOT NULL, endDate TEXT NOT NULL)');
    // clear table
    // db.execSync('DELETE FROM medications');
    // db.execSync('INSERT INTO medications (name, dosage, startDate, endDate) VALUES ("Aspirin"');
    
    
  }, []);
  
  const handleAddMedication = () => {
    setMedications((prevMedications) => [...prevMedications, newMedication]);
    setNewMedication('');
    setModalVisible(false);
    
    db.runSync('INSERT INTO medications (name, dosage, startDate, endDate) VALUES (?, 100, 10-10-10, 11-11-11)', newMedication);      
    const result = db.runSync('DUMP medications');
    console.warn(result);
  };
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView>
    <SQLiteProvider databaseName='medications.db'>
    <SafeAreaView style={styles.container}>
        <Stack.Screen
        options={{
          headerTitle: 'Home',
          headerRight: () => 
            <Button
              title="Add New Medication"
              onPress={() => setModalVisible(true)}/>
        }}
        >
      
        </Stack.Screen>
      {/* <SQLiteProvider databaseName='medications.db' assetSource={{ assetId: require('doserra/assets/medications.db') }}> */}
        <Text style={styles.title}>Medications</Text> 
      {/* <Link href="/details/novocane">Go to Details</Link> */}
      <Content medications={medications} setMedications={setMedications}/>


      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <SafeAreaView>
            <TextInput
              placeholder='Medication Name'
              onChangeText={(text) => setNewMedication(text)}
              value={newMedication}
              style={styles.input}
              autoFocus={true}
            />

            <TextInput
              placeholder='Dosage'
              keyboardType='numeric'
              onChangeText={(text) => setDosage(text)}
              style={styles.input}
            />



            <Button
              title='Add'
              onPress={handleAddMedication}
              disabled={!newMedication}
            />
            <Button
              title='Cancel'
              onPress={() => {
                setNewMedication('');
                setModalVisible(false);
              }}
            />
          </SafeAreaView>
        </SafeAreaView>


      </Modal>


      {/* </SQLiteProvider> */}
    </SafeAreaView>
    </SQLiteProvider>
    </ScrollView>
    </GestureHandlerRootView>
  );
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
      {props.medications.map((medication, index) => (
        <View key={index} style={styles.medication}>
          <Link
            href={{ 
              pathname: '/details/[medication]',
              params: { medication: medication } 
            }}
            style={styles.medicationText}
            >
            {medication}
          </Link>
        </View>
      ))} 
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 10,
    width: '100%',
  },

  medicationText: {
    fontSize: 17,
    textAlign: 'center',

  },

  medication: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    width: '65%',
    alignSelf: 'center',
  },

  header: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space items across the header
    alignItems: 'center', // Center items vertically
    padding: 10,
    backgroundColor: '#f9f9f9', // Optional: background color for header
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
   input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: 100,
    color: 'white'
  },
  button: {
    backgroundColor: '#007BFF', // Blue button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30, // Rounded corners
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },

});
