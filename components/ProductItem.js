import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function ProductItem({ product, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={{ width: 100, height: 100 }} />
      <Text>{product.title}</Text>
      <Text>${product.price}</Text>
      <Button title="Add to Cart" onPress={() => onAdd(product)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center'
  }
});
