import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../firebase';
import { signInWithCredential, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '205007317630-52cmk7cs1qne7rg2tlccgasnf0c7p80l.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@ipz232_ris/ToDoReminder',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) navigation.replace('ToDo');
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});
