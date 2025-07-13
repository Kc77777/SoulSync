import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import AvatarScreen from '../screens/AvatarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0d0c1d',
          borderTopWidth: 0,
          height: 75,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Avatar') {
            return (
              <Image
                source={require('../assets/avatar-icon.png')}
                style={{
                  width: 36,
                  height: 36,
                  tintColor: focused ? undefined : '#aaa',
                }}
              />
            );
          }

          const icons = {
            Home: 'home-outline',
            Chat: 'chatbubble-outline',
            Profile: 'person-outline',
            Settings: 'settings-outline',
          };

          return <Ionicons name={icons[route.name]} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Avatar" component={AvatarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
