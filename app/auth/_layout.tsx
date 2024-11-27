import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
      <Stack
        screenOptions={
            {
                headerShown: false
            }
        }
        
      >
        {/* Any screens specific to auth */}
        <Stack.Screen name="login"  />
        {/* <Stack.Screen name="register" /> */}
      </Stack>
    );
  }