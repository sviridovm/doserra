import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // paddingHorizontal: 20,
      justifyContent: 'center',
      // borderColor: 'black',
      // borderWidth: 2,

    },
    
    button: {
      backgroundColor: '#f9f9f9',
      borderColor: '#ddd',
      borderWidth: 2,
      borderRadius: 25,
      paddingVertical: 30,
      paddingHorizontal: 20,
      // marginVertical: 4, // Adds spacing between buttons
      width: '100%',
    },
    listContainer: {
      // width: '100%', // Make sure it takes full width of the container
      // paddingBottom: 20, // Add some space at the bottom for scrolling
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      
    },
    medicationText: {
      fontSize: 22,
    },
    bigTextContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    Icon: {
      fontSize: 22,
      marginRight: 10,
      color: '#4287f5',
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 5,
      borderRadius: 10,
    },
    smallText: {
      fontSize: 16,
      color: 'gray'
    },
    scrollContainer: {
      // flex: 1,
      flexGrow: 1,
      paddingBottom: 100,
      // marginVertical: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      // marginBottom: 10,
      marginVertical: 10,
      alignSelf: 'center',
    },
    
  });

export default styles;