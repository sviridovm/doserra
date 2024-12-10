// import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
    return (
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
        // marginVertical: 0,
        backgroundColor: '#25292e',
        animationName: 'slideIn',
        },
      }}
      >
        <Tabs.Screen name="camera" 
            options={{
              tabBarLabel: 'Camera',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="camera" color={color} size={size} />
              )

            }}
          />

        <Tabs.Screen name="index" 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
              )
            }}
        />
        <Tabs.Screen name="account"
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              )
            }}
        />
      </Tabs>
      
    );
  }