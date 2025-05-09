import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import OneSignal from 'react-native-onesignal';

export default function ToDoScreen() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const taskList = [];
      querySnapshot.forEach(doc => {
        taskList.push({ id: doc.id, ...doc.data() });
      });
      setTasks(taskList);
    } catch (e) {
      console.error('Error loading tasks:', e);
    }
  };

  const saveTask = async () => {
    if (!title || !desc) return;

    const newTask = { title, desc, time: date.toISOString() };
    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    setTasks([...tasks, { ...newTask, id: docRef.id }]);
    setTitle('');
    setDesc('');
    scheduleNotification(newTask, docRef.id);
  };

  const scheduleNotification = (task, id) => {
    OneSignal.postNotification(
      {
        headings: { en: "To-Do Reminder" },
        contents: { en: task.title },
        send_after: new Date(task.time).toISOString(),
      },
      () => console.log('Notification scheduled'),
      (e) => console.log('Notification error:', e)
    );
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(tasks.filter(task => task.id !== id));
      // Notificaцію видалити вручну не можна, але можна оновити її логіку через external_id
    } catch (e) {
      Alert.alert('Error', 'Could not delete task');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={desc} onChangeText={setDesc} style={styles.input} />
      <DateTimePicker value={date} onChange={(e, selectedDate) => setDate(selectedDate || date)} mode="datetime" />
      <Button title="Add Task" onPress={saveTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.desc}</Text>
            <Text>{new Date(item.time).toLocaleString()}</Text>
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
  task: { marginVertical: 10, padding: 10, backgroundColor: '#eee', borderRadius: 6 },
  title: { fontWeight: 'bold' }
});
