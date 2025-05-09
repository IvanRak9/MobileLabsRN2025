import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '205007317630-52cmk7cs1qne7rg2tlccgasnf0c7p80l.apps.googleusercontent.com',
    iosClientId: '205007317630-5oet3rh1bnpi0iim4jho26jvtvenc579.apps.googleusercontent.com',
    androidClientId: '205007317630-upkgmbpm7ltsv29kfoqjil9c8es75606.apps.googleusercontent.com',
    webClientId: '205007317630-52cmk7cs1qne7rg2tlccgasnf0c7p80l.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(userCredential => onLogin(userCredential.user))
        .catch(err => Alert.alert('Google Auth Error', err.message));
    }
  }, [response]);

  const handleAuth = async (isLogin) => {
    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      onLogin(userCredential.user);
    } catch (error) {
      Alert.alert('Auth Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 8 }}
      />

      <Button title="Sign In" onPress={() => handleAuth(true)} />
      <View style={{ marginVertical: 8 }} />
      <Button title="Sign Up" onPress={() => handleAuth(false)} />
      <View style={{ marginVertical: 16 }} />

      <Button
        title="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
}
