import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      Alert.alert('Помилка входу', e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Пароль" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Увійти" onPress={login} />
      <Button title="Реєстрація" onPress={() => navigation.navigate('Register')} />
      <Button title="Забули пароль?" onPress={() => navigation.navigate('ResetPassword')} />
    </View>
  );
}
