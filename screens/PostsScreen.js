import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const res = await axios.get('/posts.json');
    const parsed = Object.entries(res.data || {}).map(([id, post]) => ({ id, ...post }));
    setPosts(parsed);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="New Post" onPress={() => navigation.navigate('NewPost')} />
      <Button title="Logout" color="gray" onPress={logout} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
