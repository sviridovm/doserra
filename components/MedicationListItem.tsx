import { Pressable, View } from "react-native";
import medicationListStyles from "@/styles/commons";
import { Link } from "expo-router";
import {router} from "expo-router";


type props = {
    medication: string;
    // index: number;
} 

export default function MedicationListItem({medication}: props) {
    return (
        <Pressable style={medicationListStyles.medicationButton} onPress=
        {() => {
            router.replace({
                pathname: '/details/[medication]',
                params: { medication: medication },
            });
        }
        }>
        </Pressable> 
      );
}
