import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  margin: 10px 16px;
  border-radius: 16px;
  overflow: hidden;
  elevation: 5;
`;

const GameImage = styled.Image`
  width: 100%;
  height: 180px;
`;

const Info = styled.View`
  padding: 12px;
`;

const GameTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: bold;
`;

const GameDescription = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-top: 6px;
  font-size: 14px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const GameOldPrice = styled.Text`
  color: gray;
  text-decoration: line-through;
  margin-right: 8px;
  font-size: 14px;
`;

const GamePrice = styled.Text`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: bold;
`;

export default function GameCard({ title, description, imageUrl, price, oldPrice }) {
  return (
    <Card>
      <GameImage source={{ uri: imageUrl }} resizeMode="cover" />
      <Info>
        <GameTitle>{title}</GameTitle>
        <GameDescription>{description}</GameDescription>
        <PriceContainer>
          {oldPrice && price !== 0 && <GameOldPrice>${oldPrice}</GameOldPrice>}
          <GamePrice>{price === 0 ? 'Free' : `$${price}`}</GamePrice>
        </PriceContainer>
      </Info>
    </Card>
  );
}
