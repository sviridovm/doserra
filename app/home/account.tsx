import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View, StyleSheet, Alert } from 'react-native';
import { router } from "expo-router";
import { styles as commonStyles } from "@/styles/commons";

const AccountScreen = () => {
    const db = useSQLiteContext();

    const handleLogout = async () => {
        try {
            // Redirect to the login page
            router.replace('/auth/login');
        } catch (error) {
            console.error("Logout Error: ", error);
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <Text style={styles.title}>Account</Text>
            <View style={styles.content}>
                <Text style={styles.text}>Welcome to your account page, test user!</Text>
            </View>
            <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default function Account() {
    return (
        <SQLiteProvider databaseName="medications.db">
            <AccountScreen />
        </SQLiteProvider>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#00796b',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
