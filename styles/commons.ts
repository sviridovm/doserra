import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    marginTop: 350,
    alignItems: 'center',
    color: '#333',
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#fafafa',
    alignSelf: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'center',
  },
  userText: {
    fontSize: 18,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  medicationText: {
    fontSize: 17,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
    justifyContent: 'center', // Adjust as needed for layout
    alignItems: 'center', // Adjust as needed for layout
}
});


export const medicationListStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },

  button: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,  // Adds spacing between buttons
    width: 200,         // Full width within container
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
    flex: 1 / 3,
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
    backgroundColor: '#e0f7fa',  // Light background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#00796b',  // Button background
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    color: '#fff',  // Button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    padding: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});