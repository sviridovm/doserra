import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  link : {
    marginTop: 10,
  },
  linkText: {
    color: 'blue',
  },
  userText: {
    fontSize: 18,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationText: {
    fontSize: 17,
    textAlign: 'center',

  },

  header: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space items across the header
    alignItems: 'center', // Center items vertically
    padding: 10,
    backgroundColor: '#f9f9f9', // Optional: background color for header
  },
  
  
  
  
});


export const medicationListStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    // borderColor: 'black',
    // borderWidth: 2,
    marginBottom: 20,
  },
  
  button: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8, // Adds spacing between buttons
    width: 200,     // Full width within container
    // alignSelf: 'center', // Center horizontally
  },
  listContainer: {
    // width: '100%', // Make sure it takes full width of the container
    // paddingBottom: 20, // Add some space at the bottom for scrolling
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
});

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  inputContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    // padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    height: 50
  },
  datePickerContainer: {
    marginBottom: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    padding: 15,
    alignItems: 'center',
  },
  datePicker: {
    flex: 1,
    
  },
  datePickerText: {
    color: '#CCC',
    fontSize: 16,
    // textAlign: 'left',

  },

  buttonContainer: {
    flex: 1/3,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
  },

  button: {
    fontSize: 16,
    padding: 15,
    
  }

});

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 8,
    borderRadius: 20,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  }


});