import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, Pressable, TextInput, View, Text } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import styles from "@/styles/commons";
import { initDatabase } from "@/hooks/initDatabase";


export default function HomeScreen() {
    return (
        <SQLiteProvider databaseName="medications.db" onInit={initDatabase}>
            <RegisterScreen />
        </SQLiteProvider>
    )
}

const RegisterScreen = () => {
        
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

            // go to home
            router.replace('/home');
            
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
            <Pressable style={styles.link} onPress={() => router.replace('/auth/login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </Pressable>
        </View>
    )
}