import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  margin-top: 40px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const Username = styled.Text`
  margin-top: 16px;
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: bold;
`;

export default function ProfileInfo({ username, avatarUrl }) {
  return (
    <Container>
      <Avatar source={{ uri: avatarUrl }} />
      <Username>{username}</Username>
    </Container>
  );
}
