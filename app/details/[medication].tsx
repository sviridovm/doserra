import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Medication, defaultMedication } from '../../utils/types';
// import { styles } from '@/styles/commons';

export default function DetailsScreen() {
  const medicationJSON = useLocalSearchParams().medication?.toString();
  console.log('----------------------------')
  console.log(medicationJSON);
  const medication = JSON.parse(medicationJSON) as Medication;
  // console.log(medication);
  // const medication = medicationJSON;
  
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SQLiteProvider databaseName='medications.db'>
          <SafeAreaView style={styles.container}>
            {/* <MedicationDetails medication={medication}/> */}
            <MedicationDetails {...medication}/>
          </SafeAreaView>
        </SQLiteProvider>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

  
interface MedicationIntake {
  id: number;
  medication_id: number;
  intake_time: string;
  taken: boolean;
}

const MedicationDetails = (medication: Medication) => {
  // !PLACEHOLDER
  const username = '1';
  const db = useSQLiteContext();
  const [intakes, setIntakes] = useState<MedicationIntake[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIntake, setSelectedIntake] = useState<MedicationIntake | null>(
    null
  );

  useEffect(() => {
    const fetchIntakes = async() => {
      try {

        const intakes = await db.getAllAsync<MedicationIntake>('SELECT * FROM medication_intake WHERE medication_id = ?', [medication.id]);
        setIntakes(intakes);
        console.log(intakes);
      } catch (error) {
        console.log('Error while fetching intakes : ', error);
      }
    }
    fetchIntakes();
  }, [db]);


  const getBackgroundColor = (intake: MedicationIntake) => {
    const intakeDate = new Date(intake.intake_time);
    const now = new Date();

    if (intakeDate > now) {
      return '#ccc'; // Grey for future intake
    }
    return intake.taken ? '#4CAF50' : '#F44336'; // Green if taken, Red if missed
  };

  const getTime = (intake_time: string) => {
    const date = new Date(intake_time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;  
  }

  const handlePress = (intake: MedicationIntake) => {
    setSelectedIntake(intake);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    if (selectedIntake) {
      const updatedIntakes = intakes.map((intake) =>
        intake.id === selectedIntake.id
          ? { ...intake, taken: !intake.taken }
          : intake
      );
      setIntakes(updatedIntakes);

      try {
        await db.runAsync(
          `UPDATE medication_intake SET taken = ? WHERE id = ? AND medication_id = ?`,
          [!selectedIntake.taken, selectedIntake.id, medication.id]
        );
      } catch (error) {
        console.log("Error updating intake:", error);
      }

      setSelectedIntake(null);
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setSelectedIntake(null);
    setModalVisible(false);
  };


  return (
    <View>
      <View>
        <Text>{medication.name}</Text>
      </View>


      <Text>Dosage: {medication.dosage}</Text>
      <Text></Text>

      <View style={styles.grid}>
        {intakes.map((intake, index) => (
            <Pressable
              key={intake.id}
              onPress={() => handlePress(intake)}
              style={({ pressed }) => [
                styles.gridItem,
                { backgroundColor: getBackgroundColor(intake) },
              ]}
              >
                
                <Text style={styles.intakeText}>
                  {new Date(intake.intake_time).toLocaleDateString()}
                </Text>

                <Text style={styles.intakeText}>{getTime(intake.intake_time)}</Text>
              </Pressable>
          ))}
        </View>

        <Pressable onPress={() => router.replace('/home')}>
          <Text> Back </Text>
        </Pressable>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to log this medication?
            </Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )

}

export function CountdownTimer() {
  const medication = String(useLocalSearchParams());
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '18%', // Fits 10 items per row with spacing
    aspectRatio: 1, // Makes the items square
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 8,
    padding: 5,
  },
  intakeText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});