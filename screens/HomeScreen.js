import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [glowAnim] = useState(new Animated.Value(1));
  const navigation = useNavigation(); // ✅ Add this

  const handleTalk = () => {
    Animated.sequence([
      Animated.timing(glowAnim, {
        toValue: 1.2,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    navigation.navigate('Talk'); // ✅ Navigate to Talk screen
  };

  const handleMirror = () => {
    navigation.navigate('MirrorMode');
  };

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.centered}>
        <TouchableOpacity onPress={handleTalk} activeOpacity={0.8}>
          <Animated.Image
            source={require('../assets/avatar-glow.png')}
            style={[styles.avatar, { transform: [{ scale: glowAnim }] }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.welcomeText}>Welcome back, Aavas</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleTalk}>
            <Text style={styles.buttonText}>🗣️ Talk to Me</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleMirror}>
            <Text style={styles.buttonText}>🪞 Mirror Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width, justifyContent: 'center', alignItems: 'center' },
  centered: { alignItems: 'center', marginTop: -30 },
  avatar: { width: width * 0.7, height: width * 0.7, marginBottom: 20 },
  welcomeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(255,255,255,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonRow: { flexDirection: 'row', gap: 16 },
  button: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderColor: '#999',
    borderWidth: 1,
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  
});
