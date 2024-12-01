import styles from "@/styles/commons";
import ModalStyles from "@/styles/commons";
import { Button, Modal, SafeAreaView, TextInput } from "react-native";
import { useSQLiteContext, SQLiteDatabase } from "expo-sqlite";
import { Medication } from "@/utils/types";
// import {useForm, controller} from "react-hook-form";
import { defaultMedication } from "@/utils/types";
import { useState } from "react";

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
          <SafeAreaView style={ModalStyles.container}>
            <SafeAreaView>
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
                onChangeText={(text) => setNewMedication({...newMedication, dosage: Number(text)})}
                style={styles.input}
              />
  
              <TextInput
                placeholder='End Date'
                // onChangeText={(text) => props.setDosage(text)}
                style={styles.input}
              />
  
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
              
            </SafeAreaView>
          </SafeAreaView>
  
  
        </Modal>
  
    )
  
  }