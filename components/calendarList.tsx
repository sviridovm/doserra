import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text, Pressable, NativeSyntheticEvent, NativeScrollEvent} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import { MedicationIntake, Medication } from "@/utils/types";
import getMedsFromDate from "@/hooks/getMedsFromDate";
import { NativeComponentType } from "react-native/Libraries/Utilities/codegenNativeComponent";
type props = {
    setMedications: (medications: Medication[]) => void;
};

export default function CalendarList({setMedications}: props) {
    // const db = useSQLiteContext();

    const [dates, setDates] = useState<Date[]>([]);
    const flatlistRef = React.useRef<FlatList>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calCenter, setCalCenter] = useState(new Date());

  useEffect(() => {
    const today = calCenter;
    const week = [];
    for (let i = -3; i <= 3; i++) {
      const day = new Date();
      day.setDate(today.getDate() + i);
      week.push(day);
    }

    setDates(week);

    // scroll to middle
    
  }, [calCenter]);

  // Update the calendar when the user scrolls
const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

};



    return (
        <SQLiteProvider databaseName='medications.db'>

        <View style={styles.container}>

            <FlatList
                data={dates}
                renderItem={(item) => renderDateItem(item, setMedications, setCurrentDate)}
                keyExtractor={(item) => item.toISOString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.calendarBox}
                ref={flatlistRef}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                
                />
            
        </View>
        </SQLiteProvider>

    )

}

const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// item}: {item: Date}, {props}: {props: props.setMedications}
const renderDateItem = ({item}: {item: Date}, setMedications: (medications: Medication[]) => void, setCurrentDate: React.Dispatch<React.SetStateAction<Date>>) => {

    const getIcon = (date: Date) => {
        const otherDate = new Date(date);
        otherDate.setHours(0, 0, 0, 0);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (otherDate > currentDate) {
            return 'lock-closed'
        } else if (otherDate < currentDate) {
            return 'checkmark'
        } else {
            return 'person'
        }
}
    
    return (
        <View style={styles.itemContainer}>
            <Pressable 
            style={styles.button}
            onPress={() => {
                setCurrentDate(item);
                getMedsFromDate(item, setMedications);
            }}
            >
                <Ionicons style={styles.icon} name={getIcon(item)} size={24} color='black' />  
                <Text style={styles.textDayOfWeek}>{daysOfTheWeek[item.getDay()]}</Text>
                <Text style={styles.textDate}>{item.getDate()}</Text>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1/4,
        width: '100%',

        // borderColor: 'blue',
        // borderWidth: 1,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,

        // width: '18%'
        // borderWidth: 1,
    },
    icon: {
        // marginBottom: 10,
        borderRadius: 50,
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 15,
        backgroundColor: 'white'
    },
    textDayOfWeek: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 14,
    }, 
    textDate: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 12,
    },
    calendarBox: {
        // paddingVertical: 10,        
        // borderWidth: 1,
        marginHorizontal: 10,
    },
    button: {
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        // borderWidth: 1,
    }
    

})