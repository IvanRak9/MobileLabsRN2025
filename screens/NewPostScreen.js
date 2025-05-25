import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from '../api/axiosInstance';

export default function NewPostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const savePost = async () => {
    await axios.post('/posts.json', { title, body });
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Body" value={body} onChangeText={setBody} multiline />
      <Button title="Save" onPress={savePost} />
    </View>
  );
}
