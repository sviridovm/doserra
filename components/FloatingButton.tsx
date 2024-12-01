import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

type props = {
    onPress: (visible: boolean) => void;
  }
  
export default function FloatingButton ({onPress}: props)  {
    return (
    <View style={floatingButtonStyle.floatingButtonContainer}>
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
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 20,
    },
    floatingButton: {
      // marginBottom: 1,
      // marginRight: 20,
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingButtonIcon: {
      color: 'white',
      fontSize: 30,
    },
  });