import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Medication } from '../../utils/types';
import { initDatabase } from '@/hooks/initDatabase';
import MedicationList from '@/components/MedicationListComponents/MedicationList';
import { medicationListStyles, modalStyles, styles } from "@/styles/commons";
import AddMedicationModal from '@/components/AddMedicationModal';
import CalendarList from '@/components/calendarList';
import getMedsFromDate from '@/hooks/getMedsFromDate'; 
import { LinearGradient }from 'expo-linear-gradient';


export default function HomeScreen() {
  

  const [medications, setMedications] = useState<Medication[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    getMedsFromDate(new Date(), setMedications);
  }, []);

  
  return (
    <SQLiteProvider databaseName='medications.db' onInit={initDatabase}>
      <LinearGradient 
      colors={['rgba(52, 235, 119, 0.3)', 'rgba(42, 189, 184, 0.3)']}
      style={{
        // flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        

      }}
      // start={[0, 1]} end={[1, 0]}
      start={[0, 0]} end={[1, 0]}
      />

    {/* <SafeAreaView style={{...medicationListStyles.container, borderWidth: 1}}> */}
    <GestureHandlerRootView
      style={{
        ...medicationListStyles.container,
      }}
    >
        

        <CalendarList setMedications={setMedications}/>
        
        <AddMedicationModal 
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setMedications={setMedications}
        />
        

        <MedicationList 
        medications={medications} 
        setMedications={setMedications} 
        setModalVisible={setModalVisible}
        username='1'/>


        {/* <FloatingButton onPress={setModalVisible} /> */}


    </GestureHandlerRootView>
    {/* </SafeAreaView> */}
    </SQLiteProvider>
  );
}







 

