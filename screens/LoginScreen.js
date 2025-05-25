import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FIREBASE_AUTH_SIGNIN } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await axios.post(FIREBASE_AUTH_SIGNIN, {
        email,
        password,
        returnSecureToken: true,
      });
      await login(res.data.idToken);
    } catch (e) {
      Alert.alert('Login failed', e.response?.data?.error?.message || e.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="No account? Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
