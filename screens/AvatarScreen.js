import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function AvatarScreen() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatarReady, setAvatarReady] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAvatarReady(true);
    }, 2000);
  };

  return (
    <ImageBackground
      source={require('../assets/cosmic-background.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>✨ Your AI Soul Avatar</Text>

          <TouchableOpacity onPress={pickImage} style={styles.avatarBox}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="image-outline" size={64} color="#aaa" />
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Describe Your Soul Avatar</Text>
          <TextInput
            placeholder="e.g. a mystical guide with glowing eyes"
            placeholderTextColor="#999"
            value={prompt}
            onChangeText={setPrompt}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.generateBtn}
            onPress={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>
                {avatarReady ? 'Regenerate' : 'Give Soul'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Post-generation actions */}
          {avatarReady && (
            <View style={styles.actions}>
              <Text style={styles.readyText}>Your avatar is ready to talk!</Text>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="chatbubble-ellipses-outline" size={22} color="#fff" />
                  <Text style={styles.actionLabel}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="mic-outline" size={22} color="#fff" />
                  <Text style={styles.actionLabel}>Talk</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="videocam-outline" size={22} color="#fff" />
                  <Text style={styles.actionLabel}>Video</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safe: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarBox: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#7B61FF',
    backgroundColor: '#11111190',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarImage: {
    width: 156,
    height: 156,
    borderRadius: 78,
  },
  label: {
    color: '#aaa',
    alignSelf: 'flex-start',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1E2533BB',
    color: '#fff',
    padding: 12,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 16,
  },
  generateBtn: {
    backgroundColor: '#7B61FF',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    elevation: 8,
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    alignItems: 'center',
  },
  readyText: {
    color: '#ccc',
    marginBottom: 12,
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 24,
  },
  actionBtn: {
    backgroundColor: '#222222CC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: 80,
  },
  actionLabel: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
  },
});
