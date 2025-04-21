import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <TextInput style={styles.input} placeholder="Електронна пошта" />
      <TextInput style={styles.input} placeholder="Пароль" secureTextEntry />
      <TextInput style={styles.input} placeholder="Пароль (ще раз)" secureTextEntry />
      <TextInput style={styles.input} placeholder="Прізвище" />
      <TextInput style={styles.input} placeholder="Ім'я" />

      <Button title="Зареєструватися" onPress={() => {}} />

      <Text style={styles.footer}>Рак Іван ІПЗ-23-2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    fontStyle: 'italic',
  },
});
