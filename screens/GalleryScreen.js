import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

export default function GalleryScreen() {
  const items = Array.from({ length: 12 }, (_, i) => ({ id: i.toString() }));

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={() => <View style={styles.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: {
    backgroundColor: '#fff',
    height: 100,
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
