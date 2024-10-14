import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors';
import { SQLiteProvider } from 'expo-sqlite';

export default function RootLayout() {
  return (

    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.dark.background,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="details" />
    </Stack>
  );
}
