import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button, Modal, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Device from 'expo-device';
import { initRoot, ROOT_DIR, getFileInfo } from '../utils/fileUtils';

export default function HomeScreen({ navigation }) {
  const [path, setPath] = useState(ROOT_DIR);
  const [items, setItems] = useState([]);
  const [creating, setCreating] = useState(null); // 'folder' or 'file'
  const [input, setInput] = useState('');
  const [fileContent, setFileContent] = useState('');

useEffect(() => {
  FileSystem.getFreeDiskStorageAsync().then(free => {
    FileSystem.getTotalDiskCapacityAsync().then(total => {
      const used = total - free;
      console.log(`Всього: ${total}, Вільно: ${free}, Використано: ${used}`);
    });
  });
}, []);

  const load = async (p) => {
    const content = await FileSystem.readDirectoryAsync(p);
    setItems(content);
    setPath(p);
  };

  const goUp = () => {
    if (path !== ROOT_DIR) {
      const up = path.split('/').slice(0, -2).join('/') + '/';
      load(up);
    }
  };

  const handleOpen = async (item) => {
    const fullPath = path + item;
    const info = await FileSystem.getInfoAsync(fullPath);
    if (info.isDirectory) {
      load(fullPath + '/');
    } else {
      navigation.navigate('Viewer', { fileUri: fullPath });
    }
  };

  const handleCreate = async () => {
    const fullPath = path + input + (creating === 'folder' ? '/' : '.txt');
    if (creating === 'folder') {
      await FileSystem.makeDirectoryAsync(fullPath);
    } else {
      await FileSystem.writeAsStringAsync(fullPath, fileContent);
    }
    setInput('');
    setCreating(null);
    load(path);
  };

  const handleDelete = (item) => {
    const fullPath = path + item;
    Alert.alert(
      'Видалення',
      `Видалити "${item}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            await FileSystem.deleteAsync(fullPath, { idempotent: true });
            load(path);
          },
        },
      ]
    );
  };

  const handleInfo = async (item) => {
    const info = await getFileInfo(path + item);
    Alert.alert('Інформація про файл', `
Назва: ${info.name}
Тип: ${info.type}
Розмір: ${info.size} байт
Дата змін: ${info.modified}`);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>Поточний шлях: {path.replace(ROOT_DIR, '/')}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpen(item)} onLongPress={() => handleInfo(item)}>
            <Text style={{ padding: 10 }}>{item}</Text>
            <Button title="Видалити" onPress={() => handleDelete(item)} />
          </TouchableOpacity>
        )}
      />
      <Button title="⬆️ Назад" onPress={goUp} />
      <Button title="📁 Створити папку" onPress={() => setCreating('folder')} />
      <Button title="📝 Створити файл" onPress={() => setCreating('file')} />

      {/* Створення */}
      <Modal visible={creating !== null} transparent animationType="slide">
        <View style={{ margin: 50, backgroundColor: 'white', padding: 20 }}>
          <Text>Назва {creating === 'folder' ? 'папки' : 'файлу'}:</Text>
          <TextInput value={input} onChangeText={setInput} style={{ borderWidth: 1, marginBottom: 10 }} />
          {creating === 'file' && (
            <>
              <Text>Вміст:</Text>
              <TextInput
                value={fileContent}
                onChangeText={setFileContent}
                multiline
                style={{ borderWidth: 1, height: 100 }}
              />
            </>
          )}
          <Button title="Створити" onPress={handleCreate} />
          <Button title="Скасувати" onPress={() => { setCreating(null); setInput(''); }} />
        </View>
      </Modal>
    </View>
  );
}
