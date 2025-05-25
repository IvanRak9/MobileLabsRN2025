import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_API } from '../firebase';

const instance = axios.create({
  baseURL: FIREBASE_API,
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.params = { ...config.params, auth: token };
  }
  return config;
});

export default instance;
