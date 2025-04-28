import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  margin: 10px 16px;
  border-radius: 16px;
  overflow: hidden;
  elevation: 5;
`;

const NewsImage = styled.Image`
  width: 100%;
  height: 180px;
`;

const Info = styled.View`
  padding: 12px;
`;

const NewsTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: bold;
`;

const NewsContent = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-top: 6px;
  font-size: 14px;
`;

const Actions = styled.View`
  flex-direction: row;
  margin-top: 12px;
  align-items: center;
  justify-content: space-between;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ActionText = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-left: 6px;
  font-size: 14px;
`;

export default function NewsCard({ title, content, imageUrl, likes, commentsCount, onLikePress, onCommentPress }) {
  return (
    <Card>
      <NewsImage source={{ uri: imageUrl }} resizeMode="cover" />
      <Info>
        <NewsTitle>{title}</NewsTitle>
        <NewsContent>{content}</NewsContent>

        <Actions>
          <ActionButton onPress={onLikePress}>
            <Ionicons name="heart-outline" size={20} color="#e91e63" />
            <ActionText>{likes}</ActionText>
          </ActionButton>

          <ActionButton onPress={onCommentPress}>
            <Ionicons name="chatbubble-outline" size={20} color="#2196f3" />
            <ActionText>{commentsCount}</ActionText>
          </ActionButton>
        </Actions>
      </Info>
    </Card>
  );
}
