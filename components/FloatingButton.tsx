import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
type props = {
    onPress: (visible: boolean) => void;
  }
  
export default function FloatingButton ({onPress}: props)  {
    return (
    <View style={floatingButtonStyle.floatingButtonContainer}>
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
      <TouchableOpacity
        style={floatingButtonStyle.floatingButton}
        onPress={() => onPress(true)}>
          <Text style={floatingButtonStyle.floatingButtonIcon}>+</Text>
      </TouchableOpacity>
    </View>
    )
}
  
const floatingButtonStyle = StyleSheet.create({
    floatingButtonContainer: {
      // alignItems: 'flex-end',
      // marginBottom: 20,
    },
    container: {
      // flex: 1,
      // justifyContent: 'space-between',
      // paddingBottom: 20,
    },
    floatingButton: {
      height: 50,
      width: 50,
      borderRadius: 25,
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 2,
      alignSelf: 'center',
      top: 400,
      backgroundColor: 'rgba(100, 100, 100, 0.7)',
    },
    floatingButtonIcon: {
      color: 'white',
      fontSize: 30,
    },
  });