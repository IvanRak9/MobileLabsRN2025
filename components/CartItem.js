import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
      <Text>${item.price}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={item.quantity.toString()}
        onChangeText={val => onUpdate(item.id, parseInt(val) || 1)}
      />
      <Button title="Remove" color="red" onPress={() => onRemove(item.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1 },
  input: { borderWidth: 1, padding: 4, marginVertical: 4, width: 50 }
});
