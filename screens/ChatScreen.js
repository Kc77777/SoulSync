import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Keyboard,
  Animated,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: "Hey Aavas! I'm here for you 🌟", from: 'ai' },
  ]);
  const flatListRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMsg = { id: Date.now().toString(), text: message, from: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setMessage('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Fake AI reply after delay
    setTimeout(() => {
      const reply = {
        id: Date.now().toString() + '-ai',
        text: "I'm listening 💬 Tell me more.",
        from: 'ai',
      };
      setMessages(prev => [...prev, reply]);
      Speech.speak(reply.text);
    }, 800);
  };

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.messageBubble, item.from === 'user' ? styles.userBubble : styles.aiBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </Animated.View>
  );

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.chatContainer}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Glowing Input Bar */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.iconBtn}>
                <MaterialIcons name="add-photo-alternate" size={22} color="#888" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconBtn}>
                <MaterialIcons name="attach-file" size={22} color="#888" />
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Say something..."
                placeholderTextColor="#aaa"
                value={message}
                onChangeText={setMessage}
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />

              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="mic" size={20} color="#888" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
    marginVertical: 6,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0066ff',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  messageText: {
    color: '#fff',
    fontSize: 15,
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderWidth: 0.5,
    borderColor: '#444',
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  iconBtn: {
    padding: 6,
    marginHorizontal: 2,
  },
  sendBtn: {
    backgroundColor: '#444',
    borderRadius: 20,
    padding: 8,
    marginLeft: 4,
  },
});
