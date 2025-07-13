import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, ScrollView, ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('Aavas KC');
  const [bio, setBio] = useState('Dreamer, Builder, Soul.');
  const [mood, setMood] = useState('Calm & Focused 🌌');
  const [age, setAge] = useState('23');
  const [gender, setGender] = useState('Male');
  const [aiType, setAIType] = useState('Healer');

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Your Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/avatar-placeholder.png')}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('Avatar')}
          >
            <Ionicons name="color-wand-outline" size={18} color="#fff" />
            <Text style={styles.editText}>Edit Avatar</Text>
          </TouchableOpacity>
        </View>

        {/* Fields */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, { height: 70 }]}
          multiline
          value={bio}
          onChangeText={setBio}
          placeholder="Write a short bio"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Mood</Text>
        <TextInput
          style={styles.input}
          value={mood}
          onChangeText={setMood}
          placeholder="How are you feeling?"
          placeholderTextColor="#aaa"
        />

        <View style={styles.inlineRow}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
            />
          </View>
        </View>

        {/* AI Type */}
        <Text style={styles.label}>Preferred AI Companion Type</Text>
        <View style={styles.aiTypeRow}>
          {['Healer', 'Motivator', 'Romantic', 'Bestie'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.aiBtn,
                aiType === type && styles.aiBtnSelected,
              ]}
              onPress={() => setAIType(type)}
            >
              <Text style={[
                styles.aiText,
                aiType === type && { color: '#0b0f1a' },
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save */}
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>💾 Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#6fffd8',
    borderWidth: 2,
  },
  editBtn: {
    flexDirection: 'row',
    backgroundColor: '#222842',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 10,
  },
  editText: {
    color: '#fff',
    marginLeft: 6,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(26,30,46,0.85)',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
  },
  inlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  aiTypeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'center',
  },
  aiBtn: {
    backgroundColor: '#1a1e2e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  aiBtnSelected: {
    backgroundColor: '#6fffd8',
  },
  aiText: {
    color: '#aaa',
    fontSize: 14,
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
    marginBottom: 50,
  },
  saveText: {
    color: '#0b0f1a',
    fontSize: 16,
    fontWeight: '600',
  },
});
