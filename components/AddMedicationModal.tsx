import { modalStyles, styles } from "@/styles/commons";
import { Button, Modal, SafeAreaView, TextInput, View, Text, Alert } from "react-native";
import { useSQLiteContext, SQLiteDatabase } from "expo-sqlite";
import { Medication } from "@/utils/types";
import { defaultMedication } from "@/utils/types";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
// import { mod } from "@tensorflow/tfjs";

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

  const [medicationFocused, setMedicationFocused] = useState(false);
  const [dosageFocused, setDosageFocused] = useState(false);
  const [intervalFocused, setIntervalFocused] = useState(false);

  const handleStartDateChange = (_: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) setNewMedication(({...newMedication, startDate: selectedDate.toISOString()}));
  };

  const handleEndDateChange = (_: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) setNewMedication(({...newMedication, endDate: selectedDate.toISOString()}));

  };

  const handleAddMedication = (db: SQLiteDatabase) => {
  
    
    console.log(newMedication);
    
    db.runSync('INSERT INTO medications (name, dosage, interval, start_date, end_date, username) VALUES (?, ?, ?, ?, ?, ?)', 
      [newMedication.name, newMedication.dosage, newMedication.interval, newMedication.startDate, newMedication.endDate, '1']);
      
      interface MedicationId {
        id: number;
      }
      
      const res = db.getFirstSync<MedicationId>('SELECT id FROM medications WHERE name = ? AND dosage = ? AND interval = ? AND start_date = ? AND end_date = ? AND username = ?', [newMedication.name, newMedication.dosage, newMedication.interval, newMedication.startDate, newMedication.endDate, '1']);
      if (!res){
        Alert.alert('Error adding medication', 'Please try again');
        setNewMedication(defaultMedication);
        return;
      };
      
      newMedication.id = res.id;
      setMedications((prevMedications: Medication[]) => [...prevMedications, newMedication]);

    

    const startDate = new Date(newMedication.startDate);
    const endDate = new Date(newMedication.endDate);
    const intervalInMillis = newMedication.interval * 60 * 60 * 1000;


    // add intake for every dose between start and end date
    // const intakeEntries = [];
    // for (let time = startDate.getTime(); time <= endDate.getTime(); time += intervalInMillis) {
    //   intakeEntries.push([res.id, new Date(time).toISOString(), false]);
    // }

    // DO NOT AWAIT
    for (let i = startDate.getTime(); i <= endDate.getTime(); i += intervalInMillis) {
      db.runAsync('INSERT INTO medication_intake (medication_id, intake_time, taken) VALUES (?, ?, ?)', [res.id, new Date(i).toISOString(), false]);
    }

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
            <View style={modalStyles.inputContainer}>

              <TextInput
                placeholder='Medication Name'
                onChangeText={(text) => setNewMedication({...newMedication, name: text})}
                // value={newMedication.name}
                autoFocus={false}
                style={[modalStyles.input, {borderColor: medicationFocused ? '#34ebae' : '#CCC'}]}
                onFocus={() => setMedicationFocused(true)}
                onBlur={() => setMedicationFocused(false)}

              />
  
              <TextInput
                placeholder='Dosage'
                keyboardType='numeric'
                onChangeText={(text) => setNewMedication({...newMedication, dosage: parseInt(text)})}
                style={[modalStyles.input, {borderColor: dosageFocused ? '#34ebae' : '#CCC'}]}
                onFocus={() => setDosageFocused(true)}
                onBlur={() => setDosageFocused(false)}

              />
  
              <TextInput
                placeholder="Interval"
                keyboardType="numeric"
                onChangeText={(text) => setNewMedication({...newMedication, interval: parseInt(text)})}
                style={[modalStyles.input, {borderColor: intervalFocused ? '#34ebae' : '#CCC'}]}
                onFocus={() => setIntervalFocused(true)}
                onBlur={() => setIntervalFocused(false)}                
              />

              <View style={modalStyles.datePickerContainer}>
              <Text style={modalStyles.datePickerText}>
                Start Date: 
              </Text>
              <DateTimePicker
                value={new Date(newMedication.startDate)}
                mode="date"
                onChange={handleStartDateChange}
                style={modalStyles.datePicker}
                              
              />
              </View>

              <View style={modalStyles.datePickerContainer}>
              <Text style={modalStyles.datePickerText}>
                End Date: 
              </Text>
              <DateTimePicker
                value={new Date(newMedication.endDate)}
                mode="date"
                onChange={handleEndDateChange}
                style={modalStyles.datePicker}
                
              />
              </View>
  


          </View>
          <View style={modalStyles.buttonContainer}>

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