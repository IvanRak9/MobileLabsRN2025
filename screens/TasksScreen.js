import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GameContext } from '../contexts/GameContext';
import TaskItem from '../components/TaskItem';

export default function TasksScreen() {
  const { stats } = useContext(GameContext);
  const navigation = useNavigation();

  const [tasks, setTasks] = useState([
    { id: '1', title: 'Make 10 taps', completed: false, type: 'taps', goal: 10 },
    { id: '2', title: 'Make 5 double taps', completed: false, type: 'doubleTaps', goal: 5 },
    { id: '3', title: 'Hold for 3 seconds', completed: false, type: 'longPresses', goal: 1 },
    { id: '4', title: 'Drag the object', completed: false, type: 'panMoves', goal: 1 },
    { id: '5', title: 'Swipe right once', completed: false, type: 'swipesRight', goal: 1 },
    { id: '6', title: 'Swipe left once', completed: false, type: 'swipesLeft', goal: 1 },
    { id: '7', title: 'Change object size', completed: false, type: 'pinches', goal: 1 },
    { id: '8', title: 'Reach 100 points', completed: false, type: 'totalPoints', goal: 100 },
  ]);

  useEffect(() => {
    const updatedTasks = tasks.map(task => ({
      ...task,
      progress: stats[task.type] || 0,
      completed: (stats[task.type] || 0) >= task.goal,
    }));
    setTasks(updatedTasks);

    const allCompleted = updatedTasks.every(task => task.completed);
    if (allCompleted && updatedTasks.length > 0) {
      navigation.replace('Victory');
    }
  }, [stats]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </View>
  );
}
