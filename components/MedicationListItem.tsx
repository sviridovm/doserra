import { Pressable, View } from "react-native";
import medicationListStyles from "@/styles/commons";
import {router} from "expo-router";
import { Medication } from "@/utils/types";

type props = {
    medication: Medication;
    // index: number;
} 

export default function MedicationListItem({medication}: props) {
        
    
    return (
        <Pressable style={medicationListStyles.button} onPress=
        {() => {
            router.replace({
                pathname: '/details/[medication]',
                params: { medication: JSON.stringify(medication) },
            });
        }
        }>
        </Pressable> 
      );
}
