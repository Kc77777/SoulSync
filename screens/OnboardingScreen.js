// screens/OnboardingScreen.js
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login'); // or your next screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to SoulSync</Text>
      <Text style={styles.subtitle}>Connect. Reflect. Evolve.</Text>

      <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // keep dark background for elegance
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    height: height * 0.5,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#BBBBBB',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#9D4BFF',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#9D4BFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
