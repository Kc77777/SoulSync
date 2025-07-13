import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';

// Prevent splash from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      // Simulate background image loading (2 sec)
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  return (
    <ImageBackground
      source={require('./assets/cosmic-background.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
