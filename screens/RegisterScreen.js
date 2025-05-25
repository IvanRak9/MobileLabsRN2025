import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FIREBASE_AUTH_SIGNUP } from '../firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const res = await axios.post(FIREBASE_AUTH_SIGNUP, {
        email,
        password,
        returnSecureToken: true,
      });
      await login(res.data.idToken);
    } catch (e) {
      Alert.alert('Registration failed', e.response?.data?.error?.message || e.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
}
