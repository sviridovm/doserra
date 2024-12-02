import { Stack } from "expo-router";

export default function RootLayout() {

    return (
      <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
      }}
      >
        {/* <Stack.Screen name="[" /> */}
      </Stack>
    );
  }