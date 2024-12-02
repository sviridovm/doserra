import { modalStyles, styles } from "@/styles/commons";
import { Button, Modal, SafeAreaView, TextInput, View } from "react-native";
import { useSQLiteContext, SQLiteDatabase } from "expo-sqlite";
import { Medication } from "@/utils/types";
import { defaultMedication } from "@/utils/types";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

type props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setMedications: React.Dispatch<React.SetStateAction<Medication[]>>;

    // setDosage: (dosage: string) => void;
    // handleAddMedication: (db: SQLiteDatabase) => void;
  }

  
export default function AddMedicationModal({
  modalVisible,
  setModalVisible,
  setMedications
}: props ) {
  const db = useSQLiteContext();
  
  const [newMedication, setNewMedication] = useState(defaultMedication);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartDateChange = (_: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) setNewMedication(({...newMedication, startDate: selectedDate.toISOString()}));
  };

  const handleEndDateChange = (_: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) setNewMedication(({...newMedication, endDate: selectedDate.toISOString()}));

  };

  const handleAddMedication = (db: SQLiteDatabase) => {
  
    // setMedications((prevMedications: Medication[]) => [...prevMedications, newMedication]);
    setMedications((prevMedications: Medication[]) => [...prevMedications, newMedication]);

    console.log(newMedication);

    db.runSync('INSERT INTO medications (name, dosage, start_date, end_date, username) VALUES (?, ?, ?, ?, ?)', 
      [newMedication.name, newMedication.dosage, newMedication.startDate, newMedication.endDate, '1']);
      


    setModalVisible(false);
    setNewMedication(defaultMedication);
  
  };
  return (
      <Modal
          visible={modalVisible}
          animationType='slide'
          transparent={false}
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={modalStyles.container}>
            <View>

              <TextInput
                placeholder='Medication Name'
                onChangeText={(text) => setNewMedication({...newMedication, name: text})}
                // value={newMedication.name}
                style={styles.input}
                autoFocus={true}
              />
  
              <TextInput
                placeholder='Dosage'
                keyboardType='numeric'
                onChangeText={(text) => setNewMedication({...newMedication, dosage: parseInt(text)})}
                style={styles.input}
              />
  
            <DateTimePicker
              value={new Date(newMedication.endDate)}
              mode="date"
              onChange={handleEndDateChange}
            />

            <DateTimePicker
              value={new Date(newMedication.startDate)}
              mode="date"
              onChange={handleStartDateChange}
              />
  
          </View>
          <View>

              <Button
                title='Add'
                onPress={() => handleAddMedication(db)}
                disabled={(newMedication===defaultMedication)}
              />
              
              <Button
                title='Cancel'
                onPress={() => {
                  // setNewMedication(defaultMedication);
                  setModalVisible(false);
                }}
                />
              
          </View>
          </SafeAreaView>
  
  
        </Modal>
  
    )
  
  }