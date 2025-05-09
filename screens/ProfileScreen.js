import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { auth, db } from '../services/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: '', age: '', city: '' });

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) setProfile(snap.data());
    })();
  }, []);

  const update = async () => {
    await updateDoc(doc(db, 'users', user.uid), profile);
    Alert.alert('Профіль оновлено');
  };

  const confirmDelete = () => {
    Alert.prompt('Підтвердіть пароль', 'Щоб видалити акаунт', async (password) => {
      const cred = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, cred);
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Імʼя" value={profile.name} onChangeText={(v) => setProfile({ ...profile, name: v })} />
      <TextInput placeholder="Вік" value={profile.age} onChangeText={(v) => setProfile({ ...profile, age: v })} />
      <TextInput placeholder="Місто" value={profile.city} onChangeText={(v) => setProfile({ ...profile, city: v })} />
      <Button title="Зберегти" onPress={update} />
      <Button title="Вийти" onPress={logout} />
      <Button title="Видалити акаунт" onPress={confirmDelete} />
    </View>
  );
}
