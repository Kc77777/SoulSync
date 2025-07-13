import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [voiceFeedback, setVoiceFeedback] = useState(true);

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')}
      style={styles.bg}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>⚙️ Settings</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Section Title */}
          <Text style={styles.sectionTitle}>Preferences</Text>

          {/* Toggle Rows */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>🔔 Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor={notificationsEnabled ? '#6fffd8' : '#444'}
              trackColor={{ false: '#333', true: '#444' }}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>🌓 Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? '#6fffd8' : '#444'}
              trackColor={{ false: '#333', true: '#444' }}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>🎧 Voice Feedback</Text>
            <Switch
              value={voiceFeedback}
              onValueChange={setVoiceFeedback}
              thumbColor={voiceFeedback ? '#6fffd8' : '#444'}
              trackColor={{ false: '#333', true: '#444' }}
            />
          </View>

          {/* Support & About */}
          <Text style={styles.sectionTitle}>More</Text>

          <TouchableOpacity style={styles.linkRow}>
            <Ionicons name="chatbox-ellipses-outline" size={20} color="#6fffd8" />
            <Text style={styles.linkText}>Support & Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkRow}>
            <Ionicons name="information-circle-outline" size={20} color="#6fffd8" />
            <Text style={styles.linkText}>About SoulSync</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkRow}>
            <Ionicons name="exit-outline" size={20} color="#ff5c5c" />
            <Text style={[styles.linkText, { color: '#ff5c5c' }]}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 10,
    marginTop: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1e2e',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  toggleLabel: {
    color: '#fff',
    fontSize: 16,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1e2e',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
