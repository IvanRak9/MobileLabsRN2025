import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

const Container = styled(Animated.View)`
  background-color: ${({ completed, theme }) => (completed ? '#d4edda' : theme.card)};
  padding: 16px;
  margin-vertical: 6px;
  border-radius: 10px;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TaskText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const ProgressBarContainer = styled.View`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
`;

const ProgressBarFill = styled(Animated.View)`
  height: 100%;
  background-color: #1E90FF;
`;

const ProgressText = styled.Text`
  font-size: 12px;
  color: gray;
  margin-top: 6px;
  text-align: right;
`;

export default function TaskItem({ task }) {
  const progress = task.progress ? task.progress / task.goal : 0;

  return (
    <Container entering={task.completed ? ZoomIn : FadeIn} completed={task.completed}>
      <TopRow>
        <TaskText>{task.title}</TaskText>
        {task.completed ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <Ionicons name="close-circle" size={24} color="red" />
        )}
      </TopRow>

      {/* Прогрес-бар */}
      <ProgressBarContainer>
        <ProgressBarFill style={{ width: `${Math.min(progress * 100, 100)}%` }} />
      </ProgressBarContainer>

      <ProgressText>
        {Math.min(task.progress || 0, task.goal)}/{task.goal}
      </ProgressText>
    </Container>
  );
}
