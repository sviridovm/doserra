import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Medication, MedicationIntake } from '../../utils/types';
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

  


const MedicationDetails = (medication: Medication) => {
  //! PLACEHOLDER
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

        const res_intakes = await db.getAllAsync<MedicationIntake>('SELECT * FROM medication_intake WHERE medication_id = ?', [medication.id]);
        
        const current_time = new Date().getTime();
        // sort intakes by closest to current time
        // distance = |current_time - intake_time|
        res_intakes.sort((a, b) => Math.abs(current_time - new Date(a.intake_time).getTime()) - Math.abs(new Date(b.intake_time).getTime() - current_time));
        // get the first 10 intakes
        const new_intakes = res_intakes.slice(0, 10); 
        
        // sort intakes by their intake time
        new_intakes.sort((a, b) => new Date(a.intake_time).getTime() - new Date(b.intake_time).getTime());

        setIntakes(new_intakes);
        // console.log(intakes);
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
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let am = true;
    let minutesString;
    let hoursString;
    if (minutes < 10) {
      minutesString = `0${minutes}`;
    }

    if (hours >= 13) {
      hours -= 12;
      am = false;
    }


    return `${hours}:${minutes} ${am ? 'AM' : 'PM'}`;  
  }

  const handlePress = (intake: MedicationIntake) => {
    if (new Date(intake.intake_time) > new Date()) {
      Alert.alert('Cannot log future intakes');
      return;
    }

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
        db.runAsync(
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
      <Text style={styles.medicationHeader}>{medication.name}</Text>
      <Text style={styles.dosageText}>Dosage: {medication.dosage}</Text>
      <View style={styles.grid}>
        {intakes.map((intake) => (
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

      <Pressable onPress={() => router.replace("/home")}>
        <Text style={[styles.intakeText, { color: "#4A90E2", marginTop: 20 }]}>
          Back
        </Text>
      </Pressable>

      {/* Modal */}
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
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export function CountdownTimer() {
  const medication = String(useLocalSearchParams());
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background for better contrast
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Darker text for better readability
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Evenly spaced items
  },
  gridItem: {
    width: "30%", // Fits 3 items per row
    aspectRatio: 1, // Makes the items square
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#4A90E2", // Attractive blue shade
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    padding: 10,
  },
  intakeText: {
    color: "#fff", // White text for contrast
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    padding: 24,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: "#4CAF50", // Green for confirmation
  },
  cancelButton: {
    backgroundColor: "#F44336", // Red for cancellation
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  medicationHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginVertical: 10,
  },
  dosageText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
});