import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginAndGetToken } from '../utils/authHelpers';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const token = await loginAndGetToken(email, password);
      await AsyncStorage.setItem('soul_token', token);
      navigation.navigate('Main');
    } catch (err) {
      alert('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')} // 🔮 your cosmic background image here
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Login to SoulSync</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.altLoginContainer}>
          <TouchableOpacity style={styles.altLoginBtn}>
            <Ionicons name="logo-google" size={20} color="#fff" />
            <Text style={styles.altLoginText}>Login with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.altLoginBtn}>
            <Ionicons name="logo-apple" size={20} color="#fff" />
            <Text style={styles.altLoginText}>Login with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.75)', // subtle dark glass
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: 24,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 22,
      color: '#fff',
      marginBottom: 24,
      fontWeight: '600',
    },
    input: {
      width: '100%',
      backgroundColor: '#1c1c1e',
      padding: 14,
      borderRadius: 8,
      color: '#fff',
      marginBottom: 16,
    },
    forgot: {
      color: '#ccc',
      alignSelf: 'flex-end',
      marginBottom: 24,
    },
    loginBtn: {
      backgroundColor: '#fff',
      padding: 14,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      marginBottom: 24,
    },
    loginText: {
      color: '#000',
      fontWeight: '600',
      fontSize: 16,
    },
    altLoginContainer: {
      width: '100%',
    },
    altLoginBtn: {
      flexDirection: 'row',
      backgroundColor: '#2c2c2e',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    altLoginText: {
      color: '#fff',
      marginLeft: 10,
    },
    registerContainer: {
      flexDirection: 'row',
      marginTop: 16,
    },
    registerText: {
      color: '#aaa',
    },
    registerLink: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  