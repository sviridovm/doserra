import { Pressable, View } from "react-native";
import medicationListStyles from "@/styles/commons";
import { Link } from "expo-router";


type props = {
    medication: string;
    // index: number;
} 

export default function MedicationListItem({medication}: props) {
    return (
        <Pressable style={medicationListStyles.medicationButton}>
            <Link
            href={{ 
                pathname: '/details/[medication]',
                params: { medication: medication } 
            }}
            style={medicationListStyles.medicationText}
            >
            {medication}
            </Link>
        </Pressable> 
      );

}