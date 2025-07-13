import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TalkScreen() {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  const navigation = useNavigation();

  const handleTalk = () => {
    setIsListening(true);
    setResponse('');
    setTimeout(() => {
      setIsListening(false);
      setResponse('✨ Sure! Let’s reflect on what brings you peace today...');
    }, 2500);
  };

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Header with Back */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Talk to Me</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Avatar */}
          <Image
            source={require('../assets/avatar-placeholder.png')}
            style={styles.avatar}
          />

          {/* Mic Button */}
          <TouchableOpacity style={styles.micBtn} onPress={handleTalk}>
            <Ionicons name="mic" size={32} color="#0b0f1a" />
          </TouchableOpacity>

          {/* Listening */}
          {isListening && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#6fffd8" />
              <Text style={styles.loaderText}>Listening...</Text>
            </View>
          )}

          {/* Response */}
          {!isListening && response !== '' && (
            <ScrollView style={styles.chatBox}>
              <Text style={styles.aiReply}>{response}</Text>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#6fffd8',
    marginBottom: 30,
  },
  micBtn: {
    backgroundColor: '#6fffd8',
    padding: 20,
    borderRadius: 100,
    shadowColor: '#6fffd8',
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 30,
  },
  loader: {
    alignItems: 'center',
    marginTop: 20,
  },
  loaderText: {
    marginTop: 8,
    color: '#aaa',
  },
  chatBox: {
    backgroundColor: '#1a1e2eaa',
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    maxHeight: 250,
    width: '100%',
  },
  aiReply: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
});
