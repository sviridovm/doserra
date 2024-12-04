import { Medication } from "@/utils/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { View, Pressable, Text ,} from "react-native";
import MedicationListItem from '@/components/MedicationListComponents/MedicationListItem';
// import { medicationListStyles } from '@/styles/commons';
import { FlatList, ScrollView } from "react-native-gesture-handler";
import styles from '@/components/MedicationListComponents/styles';
import FloatingButton from "@/components/FloatingButton";
import { LinearGradient } from 'expo-linear-gradient';
type props = {
    medications: Medication[];
    setMedications: (medications: Medication[]) => void;
    username: string;
    setModalVisible: (visible: boolean) => void;
}

export default function MedicationList( props: props) {
    // const db = useSQLiteContext();
    // useEffect(() => {
    //   async function fetchMedications() {
    //     const result = await db.getAllAsync<Medication>('SELECT * FROM medications where username = ?', [props.username]);
    //     props.setMedications(result);
    //   }
  
    //   fetchMedications();
    // }, []);
  
      return (
        <View style={styles.container}>
          <Text
            style={styles.title}
          >Today You Should Take:</Text>
          {/* <LinearGradient 
      colors={['rgba(52, 235, 119, 0.3)', 'rgba(42, 189, 184, 0.3)']}
      style={{
        // flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        

      }}
      // start={[0, 1]} end={[1, 0]}
      start={[0, 0]} end={[1, 0]}
      /> */}
          <FloatingButton onPress={props.setModalVisible} />
          <FlatList 
          contentContainerStyle={styles.scrollContainer}
          data={props.medications} 
          renderItem={({item}) => <MedicationListItem medication={item}/>}
          keyExtractor={(item, index) => index.toString()}
          >
          {/* {props.medications.map((medication, index) => (
            <MedicationListItem key={index} medication={medication}/>       
            ))}  */}
         </FlatList>
        </View>
      );
  
  }

