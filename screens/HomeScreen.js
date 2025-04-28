import React, { useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import GameObject from '../components/GameObject';
import { GameContext } from '../contexts/GameContext';

export default function HomeScreen({ navigation }) {
  const [score, setScore] = useState(0);
  const { incrementStat } = useContext(GameContext);

  const handleScoreChange = (points) => {
    setScore(prev => prev + points);

    if (points === 1) {
      incrementStat('taps');
    } else if (points === 2) {
      incrementStat('doubleTaps');
    } else if (points === 5) {
      incrementStat('longPresses');
    } else {
      incrementStat('swipes');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Score: {score}</Text>
      <GameObject onScoreChange={handleScoreChange} />
      <Button title="Go to Tasks" onPress={() => navigation.navigate('Tasks')} style={{ marginTop: 20 }} />
    </View>
  );
}
