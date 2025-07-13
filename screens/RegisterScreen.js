import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// ⚙️ Use your actual local IP address here
const API_BASE = 'http://192.168.1.20:8000';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE}/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data?.message) {
        alert('✅ Registered successfully!');
        navigation.navigate('Login');
      } else {
        alert('Registration succeeded but no confirmation received.');
      }
    } catch (err) {
      console.error('Full Axios Error:', JSON.stringify(err, null, 2));

      if (err.response) {
        const errorData = err.response.data;
        const errorMessage =
          errorData?.detail ||
          JSON.stringify(errorData) ||
          'Something went wrong (backend)';
        alert('Register failed: ' + errorMessage);
      } else if (err.request) {
        console.log('No response from server:', err.request);
        alert('Register failed: No response from server.');
      } else {
        console.log('Error setting up request:', err.message);
        alert('Register failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.innerContainer}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>
              {loading ? 'Registering...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0,0,0,0.75)', // cosmic overlay
  },
  card: {
    width: '100%',
    backgroundColor: '#141414',
    borderRadius: 16,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5c5cff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
  },
});
