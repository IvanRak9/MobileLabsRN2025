import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function FileViewerScreen({ route, navigation }) {
  const { fileUri } = route.params;
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      const data = await FileSystem.readAsStringAsync(fileUri);
      setContent(data);
    })();
  }, []);

  const save = async () => {
    await FileSystem.writeAsStringAsync(fileUri, content);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        multiline
        value={content}
        onChangeText={setContent}
        style={{ flex: 1, borderWidth: 1, padding: 10 }}
      />
      <Button title="Зберегти" onPress={save} />
    </View>
  );
}
