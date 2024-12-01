import { Pressable, View, Text } from "react-native";
import { medicationListStyles, styles } from "@/styles/commons";
import {router} from "expo-router";
import { Medication } from "@/utils/types";

type props = {
    medication: Medication;
    // index: number;
} 

export default function MedicationListItem({medication}: props) {
        
    
    return (
        <View style={medicationListStyles.listContainer}>
        <Pressable style={medicationListStyles.button} 
        onPress= {() => {
            router.replace({
                pathname: '/details/[medication]',
                params: { medication: JSON.stringify(medication) },
            });
        }}
        >
            <Text style={styles.medicationText}>
                {medication.name}
            </Text>

        </Pressable>
        </View> 
      );
}
