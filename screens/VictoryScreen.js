import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { GameContext } from '../contexts/GameContext';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
`;

const Message = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 30px;
`;

const Button = styled.TouchableOpacity`
  background-color: #1E90FF;
  padding: 14px 28px;
  border-radius: 12px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const AnimatedCongrats = styled(Animated.Text)`
  font-size: 24px;
  color: #ff6347;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default function VictoryScreen() {
  const { resetStats } = useContext(GameContext);
  const navigation = useNavigation();

  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const handlePlayAgain = () => {
    resetStats();
    navigation.navigate('Home');
  };

  return (
    <Container>
      <AnimatedCongrats style={animatedStyle}>🎉 Well done! 🎉</AnimatedCongrats>

      <Title>Victory!</Title>
      <Message>Congratulations! You have completed all the tasks!</Message>

      <Button onPress={handlePlayAgain}>
        <ButtonText>Play Again</ButtonText>
      </Button>
    </Container>
  );
}