// import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
    return (
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
        backgroundColor: '#25292e',
        },
      }}
      >
        <Tabs.Screen name="index" 
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
              )
            }}
        />
        <Tabs.Screen name="camera" 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="camera" color={color} size={size} />
              )

            }}
          />
        <Tabs.Screen name="account"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              )
            }}
        />
      </Tabs>
      
    );
  }