import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatItem from '../components/ChatItem';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Tab = createMaterialTopTabNavigator();

const communityChats = [
  {
    id: '1',
    username: 'Steam Group 1',
    lastMessage: 'Welcome to our community!',
    avatarUrl: 'https://picsum.photos/seed/group1/100'
  },
  {
    id: '2',
    username: 'Steam Gamers',
    lastMessage: 'Let’s play tonight!',
    avatarUrl: 'https://picsum.photos/seed/group2/100'
  }
];

const friendChats = [
  {
    id: '1',
    username: 'Alex',
    lastMessage: 'See you later!',
    avatarUrl: 'https://picsum.photos/seed/friend1/100'
  },
  {
    id: '2',
    username: 'Maria',
    lastMessage: 'Game on?',
    avatarUrl: 'https://picsum.photos/seed/friend2/100'
  }
];

function CommunityChatsScreen() {
  return (
    <Container>
      <FlatList
        data={communityChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            username={item.username}
            lastMessage={item.lastMessage}
            avatarUrl={item.avatarUrl}
          />
        )}
      />
    </Container>
  );
}

function FriendChatsScreen() {
  return (
    <Container>
      <FlatList
        data={friendChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            username={item.username}
            lastMessage={item.lastMessage}
            avatarUrl={item.avatarUrl}
          />
        )}
      />
    </Container>
  );
}

export default function ChatScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#fff' }
      }}
    >
      <Tab.Screen name="Community Chats" component={CommunityChatsScreen} />
      <Tab.Screen name="Friend Chats" component={FriendChatsScreen} />
    </Tab.Navigator>
  );
}
