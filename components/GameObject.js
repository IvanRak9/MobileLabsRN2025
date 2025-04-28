import React, { useContext } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GameContext } from '../contexts/GameContext';

const Ball = styled(Animated.View)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: gold;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

const BallText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export default function GameObject({ onScoreChange }) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { incrementStat } = useContext(GameContext);

  // ===== Одиночний тап =====
  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      scale.value = withSpring(1.2);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      incrementStat('taps', 1);
      onScoreChange(1);
    });

  // ===== Подвійний тап =====
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = withSpring(1.4);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      incrementStat('doubleTaps', 2);
      onScoreChange(2);
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(3000)
    .onStart(() => {
      scale.value = withSpring(1.6);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      incrementStat('longPresses', 5);
      onScoreChange(5);
    });



  // ===== Перетягування =====
  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onFinalize(() => {
      incrementStat('panMoves');
    });

  // ===== Масштабування (Pinch) =====
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      incrementStat('pinches');
    });

  // ===== Свайп вгору (Swipe Up) =====
  const flingUpGesture = Gesture.Fling()
    .direction('up')
    .onEnd(() => {
      const bonus = Math.floor(Math.random() * 10) + 1;
      incrementStat('swipesUp', bonus);
      onScoreChange(bonus);
    });

  // ===== Свайп вправо (Swipe Right) =====
  const flingRightGesture = Gesture.Fling()
    .direction('right')
    .onEnd(() => {
      incrementStat('swipesRight');
    });

  // ===== Свайп вліво (Swipe Left) =====
  const flingLeftGesture = Gesture.Fling()
    .direction('left')
    .onEnd(() => {
      incrementStat('swipesLeft');
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const composedGesture = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTapGesture, longPressGesture, tapGesture),
    panGesture,
    pinchGesture,
    flingUpGesture,
    flingRightGesture,
    flingLeftGesture
  );

  return (
    <GestureDetector gesture={composedGesture}>
      <Ball style={animatedStyle}>
        <BallText>Tap!</BallText>
      </Ball>
    </GestureDetector>
  );
}
