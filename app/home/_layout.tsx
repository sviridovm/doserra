// import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
    return (
      <Tabs>
        <Tabs.Screen name="index" 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
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