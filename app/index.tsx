import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { processColorsInProps } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';



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

// const db = SQLite.openDatabaseSync('medications.db');

export default function HomeScreen() {
  // const db = SQLite.importDatabaseFromAssetAsync(require('doserra/assets/medications.db'));

  const [medications, setMedications] = useState<string[]>(['Aspirin', 'coochie']);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMedication, setNewMedication] = useState('');


  const handleAddMedication = () => {

      setMedications((prevMedications) => [...prevMedications, newMedication]);
      setNewMedication('');
      setModalVisible(false);
      
  };
  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <Text style={styles.title}>Home</Text> 
      <Link href="/details/novocane">Go to Details</Link>
      <Content medications={medications}/>

      <Modal
        visible={modalVisible}
        animationType='fade'
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
    </GestureHandlerRootView>
  );
}


// export function Header() {

// }

interface Medication {
  name: string;
}

type ContentProps = {
  medications: string[];
}

export function Content( props: ContentProps) {
  // const db = useSQLiteContext();
  // const [medications, setMedications] = useState<Medication[]>([]);

  

  useEffect(() => {
    async function fetchMedications() {
      // const result = await db.getAllAsync<Medication>('SELECT * FROM medications');
      // setMedications(result);
    }

    fetchMedications();
  }, []);

  return (
    <View>
      <Text>Medications:</Text>
      <FlatList
        data={props.medications}
        renderItem={({item}) => 
        <View style={styles.medication}>
          <Link
            href={{ 
              pathname: '/details/[medication]',
              params: { medication: item } 
            }}>
            {item}
          </Link>
        </View>}
      ></FlatList>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  medication: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
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
    width: '100%',
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
