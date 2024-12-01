import styles from "@/styles/commons";
import ModalStyles from "@/styles/commons";
import { Button, Modal, SafeAreaView, TextInput } from "react-native";
import { useSQLiteContext, SQLiteDatabase } from "expo-sqlite";

type props = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    newMedication: string;
    setNewMedication: (medication: string) => void;
    dosage: string;
    setDosage: (dosage: string) => void;
    handleAddMedication: (db: SQLiteDatabase) => void;
  }


export default function AddMedicationModal(props: props ) {
    const db = useSQLiteContext();
    
    return (
      <Modal
          visible={props.modalVisible}
          animationType='slide'
          transparent={false}
          onRequestClose={() => props.setModalVisible(false)}
        >
          <SafeAreaView style={ModalStyles.container}>
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