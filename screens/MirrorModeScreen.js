import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MirrorMode() {
  const navigation = useNavigation();
  const [entry, setEntry] = useState('');
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');

  const handleSave = () => {
    if (selectedMood && entry.trim()) {
      const newEntry = {
        mood: selectedMood,
        text: entry,
        timestamp: new Date().toLocaleString(),
      };
      setMoods([newEntry, ...moods]);
      setEntry('');
      setSelectedMood('');
    }
  };

  const moodOptions = [
    { emoji: '😌', label: 'Calm' },
    { emoji: '😊', label: 'Happy' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😤', label: 'Stressed' },
    { emoji: '🤯', label: 'Overwhelmed' },
  ];

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* 🔙 Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>🌙 Mirror Mode</Text>
          <Text style={styles.subtitle}>How are you feeling today?</Text>

          {/* Mood Buttons */}
          <View style={styles.moodRow}>
            {moodOptions.map(({ emoji, label }) => (
              <TouchableOpacity
                key={label}
                style={[
                  styles.moodBtn,
                  selectedMood === label && styles.selectedMood,
                ]}
                onPress={() => setSelectedMood(label)}
              >
                <Text style={styles.moodEmoji}>{emoji}</Text>
                <Text style={styles.moodText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="Write your thoughts..."
            placeholderTextColor="#aaa"
            value={entry}
            onChangeText={setEntry}
            multiline
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>💾 Save Entry</Text>
          </TouchableOpacity>

          {/* Saved Entries */}
          {moods.map((m, i) => (
            <View key={i} style={styles.entryCard}>
              <Text style={styles.entryHeader}>
                {m.mood} • {m.timestamp}
              </Text>
              <Text style={styles.entryText}>{m.text}</Text>
            </View>
          ))}
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
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  moodBtn: {
    backgroundColor: '#1a1e2e',
    paddingVertical: 10,
    paddingHorizontal: 14,
    margin: 6,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedMood: {
    backgroundColor: '#6fffd8',
    borderColor: '#6fffd8',
  },
  moodEmoji: {
    fontSize: 20,
  },
  moodText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1e2e',
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: '#6fffd8',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#6fffd8',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  saveText: {
    color: '#0b0f1a',
    fontSize: 16,
    fontWeight: '600',
  },
  entryCard: {
    backgroundColor: '#1a1e2eaa',
    width: '100%',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  entryHeader: {
    color: '#6fffd8',
    fontWeight: '600',
    marginBottom: 6,
  },
  entryText: {
    color: '#fff',
  },
});
