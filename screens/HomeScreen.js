import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const newsData = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  title: `Новина №${i + 1}`,
  date: 'Дата новини',
  description: 'Текст новини',
  image: 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg',
}));

export default function HomeScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Новини</Text>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 24, textAlign: 'center', marginVertical: 10 },
  item: { flexDirection: 'row', marginVertical: 8 },
  image: { width: 80, height: 80, marginRight: 10 },
  textContainer: { flex: 1 },
  title: { fontWeight: 'bold', fontSize: 16 },
  date: { color: 'gray', fontSize: 12, marginBottom: 4 },
});
