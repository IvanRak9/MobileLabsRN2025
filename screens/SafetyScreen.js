import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const HelpSection = styled.View`
  margin-top: 40px;
  width: 90%;
`;

const HelpTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
  text-align: center;
`;

const HelpText = styled.Text`
  font-size: 14px;
  color: gray;
  line-height: 22px;
  text-align: center;
`;

const CodeContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const CodeText = styled(Animated.Text)`
  position: absolute;
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 10px;
`;

export default function SafetyScreen() {
  const [code, setCode] = useState(generateCode());
  const [secondsLeft, setSecondsLeft] = useState(30);

  function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          setCode(generateCode());
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const radius = 80;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (secondsLeft / 30) * circumference;

  return (
    <Container>
      <CodeContainer>
        <Svg width={radius * 2} height={radius * 2}>
          <Circle
            stroke="#e0e0e0"
            fill="none"
            cx={radius}
            cy={radius}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="#1E90FF"
            fill="none"
            cx={radius}
            cy={radius}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            rotation="-90"
            origin={`${radius}, ${radius}`}
          />
        </Svg>

        {/* Анімований код */}
        <CodeText entering={ZoomIn.duration(400)}>
          {code}
        </CodeText>
      </CodeContainer>

      <HelpSection>
        <HelpTitle>What is Steam Guard?</HelpTitle>
        <HelpText>
          Steam Guard provides an additional level of security to your Steam account.
          It uses a time-sensitive code generated here to confirm your identity when logging in from new devices.
        </HelpText>
      </HelpSection>
    </Container>
  );
}
