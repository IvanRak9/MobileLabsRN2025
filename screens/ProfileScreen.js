import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
    surname: '',
    name: '',
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <TextInput
        style={styles.input}
        placeholder="Електронна пошта"
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        onChangeText={(text) => handleChange('password', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль (ще раз)"
        secureTextEntry
        onChangeText={(text) => handleChange('confirm', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Прізвище"
        onChangeText={(text) => handleChange('surname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ім'я"
        onChangeText={(text) => handleChange('name', text)}
      />

      <View style={styles.button}>
        <Button title="Зареєструватися" onPress={() => {}} color="#007AFF" />
      </View>

      <Text style={styles.footer}>Рак Іван, ІПЗ-23-2</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: { marginVertical: 10 },
  footer: { textAlign: 'center', marginTop: 20, color: '#777' },
});
