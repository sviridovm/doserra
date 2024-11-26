import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, Pressable, TextInput, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { initDatabase } from '../../hooks/initDatabase';


export default function HomeScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [meds, setMeds] = useState([]);
    
    return (
        <SQLiteProvider databaseName="medications.db" onInit={initDatabase}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            {/* Use render prop to pass setIsLoggedIn */}
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    )}
    )
    

}


export const LoginScreen = (setIsLoggedIn) => {
    
    const db = useSQLiteContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //function to handle login logic
    const handleLogin = async() => {
        if  (username.length === 0 || password.length === 0) {
            Alert.alert('Attention!', 'Please enter all the fields.');
            return;
        }
        try {
            const existingUser = await db.getFirstAsync('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
            if (!existingUser) {
                Alert.alert('Error', 'Invalid credentials.');
                return;
            }
            // Clear the fields
            setUsername('');
            setPassword('');
            // go to home page
            setIsLoggedIn(true);
        } catch (error) {
            console.log('Error during Login : ', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput 
                style={styles.input}
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
            />
            <TextInput 
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
            />
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText} >Login</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Don't have an account? Register</Text>
            </Pressable>
        </View>
    )
}



export const RegisterScreen = () => {
        
    const db = useSQLiteContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //function to handle register logic
    const handleRegister = async() => {
        if  (username.length === 0 || password.length === 0) {
            Alert.alert('Attention!', 'Please enter all the fields.');
            return;
        }
        try {
            const existingUser = await db.getFirstAsync('SELECT * FROM users WHERE username = ?', [username]);
            if (existingUser) {
                Alert.alert('Error', 'Username already exists.');
                return;
            }

            await db.runAsync('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
            Alert.alert('Success', 'Account created successfully!');
            // Clear the fields
            setUsername('');
            setPassword('');
            // go to login page
            // navigation.navigate('Login');
        } catch (error) {
            console.log('Error during Registration : ', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput 
                style={styles.input}
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
            />
            <TextInput 
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
            />
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText} >Register</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
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
    }
  });