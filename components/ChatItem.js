import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.card};
  padding: 16px;
  margin: 8px 16px;
  border-radius: 12px;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const Info = styled.View`
  margin-left: 16px;
`;

const Username = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: bold;
`;

const LastMessage = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-top: 4px;
`;

export default function ChatItem({ username, lastMessage, avatarUrl }) {
  return (
    <Container>
      <Avatar source={{ uri: avatarUrl }} />
      <Info>
        <Username>{username}</Username>
        <LastMessage>{lastMessage}</LastMessage>
      </Info>
    </Container>
  );
}
