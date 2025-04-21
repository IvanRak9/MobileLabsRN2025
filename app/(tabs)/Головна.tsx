import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const news = Array(10).fill({
  title: "Заголовок новини",
  date: "Дата новини",
  description: "Короткий текст новини",
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Новини</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image source={require('../assets/placeholder.png')} style={styles.newsImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText}>{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <Text style={styles.footer}>Рак Іван ІПЗ-23-2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  heading: { fontSize: 24, textAlign: 'center', marginVertical: 10 },
  newsItem: { flexDirection: 'row', marginBottom: 10 },
  newsImage: { width: 50, height: 50, marginRight: 10 },
  newsTitle: { fontWeight: 'bold' },
  newsDate: { fontStyle: 'italic', fontSize: 12 },
  newsText: { fontSize: 12 },
  footer: { textAlign: 'center', marginTop: 10, fontSize: 12, fontStyle: 'italic' },
});
