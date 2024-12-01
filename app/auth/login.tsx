import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, Pressable, TextInput, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { initDatabase } from '@/hooks/initDatabase';
import { Stack, router } from "expo-router";
import { styles } from "@/styles/commons";

export default function HomeScreen() {

    return (
        <SQLiteProvider databaseName="medications.db" onInit={initDatabase}>
            <LoginScreen />
        </SQLiteProvider>
        )
}


const LoginScreen = () => {

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
            router.push('/home');


        } catch (error) {
            console.log('Error during Login : ', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
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
            <Pressable style={styles.link} onPress={() => router.replace('/auth/register')}>
                <Text style={styles.linkText}>Don't have an account? Register</Text>
            </Pressable>
        </SafeAreaView>
        
    )
}



