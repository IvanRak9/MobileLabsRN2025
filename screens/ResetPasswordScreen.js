import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');

  const reset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Перевірте пошту для скидання пароля');
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Скинути пароль" onPress={reset} />
    </View>
  );
}
