// utils/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'http://192.168.1.103:8000'; // ✅ Use your IP here

export async function sendMood(mood, note) {
  const token = await AsyncStorage.getItem('soul_token');
  const res = await fetch(`${API_BASE}/mood/entry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mood, note }),
  });

  return await res.json();
}

export async function getMoodEntries() {
  const token = await AsyncStorage.getItem('soul_token');
  const res = await fetch(`${API_BASE}/mood/entries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
