import { Pressable, View, Text, StyleSheet } from "react-native";
import {router} from "expo-router";
import { Medication } from "@/utils/types";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles  from "@/components/MedicationListComponents/styles";
type props = {
    medication: Medication;
    // index: number;
} 

export default function MedicationListItem({medication}: props) {
        
    
    return (
        <View style={styles.listContainer}>
        <Pressable style={styles.button} 
        onPress= {() => {
            router.replace({
                pathname: '/details/[medication]',
                params: { medication: JSON.stringify(medication) },
            });
        }}
        >

            <View style={styles.bigTextContainer}>

                <Icons name='pill' style={styles.Icon}/>

                <Text style={styles.medicationText}>
                    {medication.name}
                </Text>

            </View>

                <Text style={styles.smallText}>
                    {medication.dosage}mg
                </Text>


        </Pressable>
        </View> 
      );
}



