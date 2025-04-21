import { View, FlatList, StyleSheet } from 'react-native';

const images = Array(12).fill(); // Placeholder

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={2}
        renderItem={() => <View style={styles.photo} />}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.footerWrapper}>
        <Text style={styles.footer}>Рак Іван ІПЗ-23-2</Text>
      </View>
    </View>
  );
}

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  photo: {
    backgroundColor: '#eee',
    height: 100,
    flex: 1,
    margin: 5,
    borderRadius: 8,
  },
  footerWrapper: { alignItems: 'center', marginTop: 10 },
  footer: { fontSize: 12, fontStyle: 'italic' },
});
