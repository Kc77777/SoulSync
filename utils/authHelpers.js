// utils/authHelpers.js
import axios from 'axios';

const API_BASE = 'http://192.168.1.103:8000'; // ✅ Your backend IP

export async function loginAndGetToken(email, password) {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email,
      password,
    }, { timeout: 7000 });

    if (response.data?.token) {
      return response.data.token;
    } else {
      throw new Error('No token received');
    }
  } catch (err) {
    console.warn('Login failed:', err);
    throw new Error(err.response?.data?.detail || 'Login error');
  }
}

export async function registerUser(name, email, password) {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, {
      name,
      email,
      password,
    }, { timeout: 7000 });

    if (response.data?.message === "User registered successfully") {
      return true;
    } else {
      throw new Error(response.data?.message || 'Register failed');
    }
  } catch (err) {
    console.warn('Register failed:', err);
    throw new Error(err.response?.data?.detail || 'Register error');
  }
}
