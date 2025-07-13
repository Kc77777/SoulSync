import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import MirrorModeScreen from '../screens/MirrorModeScreen';
import BottomTabs from './BottomTabs';
 // Contains Home, Chat, Avatar, etc.
 import TalkScreen from '../screens/TalkScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="MirrorMode" component={MirrorModeScreen} />
      <Stack.Screen name="Talk" component={TalkScreen} />
    </Stack.Navigator>
  );
}
