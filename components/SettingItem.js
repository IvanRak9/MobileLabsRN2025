import React from 'react';
import styled from 'styled-components/native';
import { Switch } from 'react-native';

const Container = styled.View`
  background-color: ${({ theme }) => theme.card};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin: 8px 16px;
  border-radius: 12px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

export default function SettingItem({ label, value, onValueChange }) {
  return (
    <Container>
      <Label>{label}</Label>
      <Switch
        value={value}
        onValueChange={onValueChange}
      />
    </Container>
  );
}
