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
  },
  
  button: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8, // Adds spacing between buttons
    width: '100%',     // Full width within container
    alignSelf: 'center', // Center horizontally
  },
  listContainer: {
    width: '100%', // Make sure it takes full width of the container
    paddingBottom: 20, // Add some space at the bottom for scrolling
  },
  
});

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
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