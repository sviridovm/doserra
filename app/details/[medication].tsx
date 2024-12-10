import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, Modal, Alert, TextInput, TextComponent } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { openDatabaseSync, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Medication, MedicationIntake } from '../../utils/types';
// import { styles } from '@/styles/commons';

export default function DetailsScreen() {
  const medicationJSON = useLocalSearchParams().medication?.toString();
  console.log('----------------------------')
  //console.log(medicationJSON);
  const medication = JSON.parse(medicationJSON) as Medication;

  const [editModal, setEditModal] = useState(false);

  const[name, setName] = useState(medication.name);
  const[interval, setInterval] = useState(medication.interval);
  const[dosage, setDosage] = useState(medication.dosage);
  const[id, setId] = useState(medication.id);

  const [temp, setTemp] = useState(false);

  // console.log(medication);
  // const medication = medicationJSON;



  const editMed = (med : Medication) => {
    setEditModal(true);
  };

  async function handleSave() {
    const db = await openDatabaseSync('medications.db');
    // Save edited medication to the database
  
    // Assuming db is the SQLite context
      db.runSync(
        'UPDATE medications SET name = ?, interval = ?, dosage = ? WHERE id = ?',
        [name, interval, dosage, id]
      )

      const res = await db.getFirstSync<Medication>('SELECT * FROM medications WHERE id = ?', [id]);
      console.log(res);
        // Optionally, update the medication in the local state to reflect the changes
        // Update medication state if necessary here
  
        // Close the modal after saving
        setEditModal(false);

        if (res) {
          setName(res.name);
        }
        // Optionally, show a success message
        Alert.alert("Medication saved successfully!");
    }
  

  return (

    <GestureHandlerRootView>
      <ScrollView>
        <SQLiteProvider databaseName='medications.db'>
        <View style={styles.headerContainer}>
              <Text style={styles.header}>Medication Details</Text>
              <Pressable style={styles.editButton} onPress={() => editMed(medication)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </Pressable>
          </View>
          <MedicationDetails medication={medication}/>
        </SQLiteProvider>
      </ScrollView>
      <Modal animationType='slide'
             transparent = {true}
             visible={editModal}
             onRequestClose={() => setEditModal(!editModal)}>

<View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Edit Medication</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Dosage"
            value={dosage.toString()}
            onChangeText={(text) => setDosage(Number(text))} 
          />
          <Pressable
            style={[styles.button, styles.buttonClose, {backgroundColor: '#00796b'}]}
            onPress={handleSave}>
            <Text style={styles.textStyle}>Save</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose, {backgroundColor: '#f44336'}]}
            onPress={() => setEditModal(false)}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </View>

      </Modal>
    </GestureHandlerRootView>
  );
}

  


const MedicationDetails = ({ medication }: { medication: Medication}) => {
  //! PLACEHOLDER
  const username = '1';
  const db = useSQLiteContext();
  const [intakes, setIntakes] = useState<MedicationIntake[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIntake, setSelectedIntake] = useState<MedicationIntake | null>(
    null
  );

  const [confrimDel, setConfirmDel] = useState(false);  

      // Handle Delete Logic
      const handleDelete = () => {

        console.log('Deleting medication with id: ', medication.id);
        // set db to be the database
        const db = openDatabaseSync('medications.db');
        // delete the medication from the database
        db.runSync('DELETE FROM medications WHERE id = ?', [medication.id]);
  
        /// route back to home
        router.replace('/home');
      };

  const medication_obj = db.getFirstSync<Medication>('SELECT * FROM medications WHERE id = ?', [medication.id]);

  useEffect(() => {
    const fetchIntakes = async() => {
      try {
        console.log('Fetching intakes for medications: ', medication);

        const res_intakes = await db.getAllAsync<MedicationIntake>('SELECT * FROM medication_intake WHERE medication_id = ?', [medication.id]);
        
        const current_time = new Date().getTime();
        // sort intakes by closest to current time
        // distance = |current_time - intake_time|
        res_intakes.sort((a, b) => Math.abs(current_time - new Date(a.intake_time).getTime()) - Math.abs(new Date(b.intake_time).getTime() - current_time));
        // get the first 9 intakes
        const new_intakes = res_intakes.slice(0, 9); 
        
        // sort intakes by their intake time
        new_intakes.sort((a, b) => new Date(a.intake_time).getTime() - new Date(b.intake_time).getTime());

        setIntakes(new_intakes);
        // console.log(intakes);
      } catch (error) {
        console.log('Error while fetching intakes : ', error);
      }
    }
    fetchIntakes();
  }, [db, medication]);


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

  const handleCancelDel = () => {
    setSelectedIntake(null);
    setConfirmDel(false);
  };


  return (
    <View>
      {medication_obj && <Text style={styles.medicationHeader}>{medication_obj.name}</Text>}
      {medication_obj && <Text style={styles.dosageText}>Dosage: {medication_obj.dosage} mg</Text>}
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


    <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginRight: 10, marginLeft: 10}}>
      <Pressable onPress={() => router.replace("/home")}>
        <Text style={[styles.button, styles.pagebutton, { color: "white", fontWeight: "bold", marginTop: 20 }]}>
          Back
        </Text>
      </Pressable>

      <Pressable 
      onPress={() => setConfirmDel(true)}>
        <Text style={[styles.button, styles.pagebutton, { backgroundColor: "#F44336", fontWeight: "bold", marginTop: 20 }]}>
          Delete
        </Text>
      </Pressable>
    </View>



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


      <Modal
        animationType="slide"
        transparent={true}
        visible={confrimDel}
        onRequestClose={handleDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this medication?
            </Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelDel}
              >
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDelete}
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa", // Light cyan background for a pleasant look
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 45,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796b", // Dark teal color for header text
  },
  editButton: {
    backgroundColor: "#00796b", // Dark teal button color
    padding: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Evenly spaced items
    paddingHorizontal: 16,
  },
  gridItem: {
    width: "30%", // Fits 3 items per row
    aspectRatio: 1, // Makes the items square
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#00796b", // Attractive dark teal shade
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    padding: 10,
  },
  intakeText: {
    color: "#e0f7fa", // Light cyan text for contrast
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
    color: "#00796b", // Dark teal color for medication header
    textAlign: "center",
    marginVertical: 10,
  },
  dosageText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 8,
    borderColor: "#00796b", // Dark teal border color
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  pagebutton: {
    backgroundColor: '#00796b', // Dark teal button color
    marginTop: 10,
    fontSize: 13,
    paddingVertical: 12,
    paddingHorizontal: 75,
    borderRadius: 8,
  },
  deletebutton: {
    backgroundColor: '#f44336', 
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonClose: {
    marginTop: 10,
  },
});