import React, { useState, useEffect, useRef } from 'react';
import { FlatList, TextInput, Button, Alert } from 'react-native';
import styled from 'styled-components/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 16px;
`;

const CommentText = styled.Text`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.card};
  padding: 10px;
  margin-vertical: 6px;
  border-radius: 8px;
`;

const EmptyStateText = styled.Text`
  text-align: center;
  color: gray;
  margin-top: 50px;
  font-size: 16px;
`;

export default function CommentsScreen({ route, navigation }) {
  const { postId, comments, onAddComment } = route.params;
  const [localComments, setLocalComments] = useState(comments);
  const [text, setText] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    navigation.setOptions({ title: `Comments (${localComments.length})` });
  }, [localComments]);

  const handleSend = () => {
    if (text.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter a comment!'
      });
      return;
    }

    const updatedComments = [...localComments, text];
    setLocalComments(updatedComments);
    onAddComment(postId, text);
    setText('');

    Toast.show({
      type: 'success',
      text1: 'Comment added successfully!'
    });

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleDeleteComment = (index) => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setLocalComments(prev => prev.filter((_, i) => i !== index));
          }
        }
      ]
    );
  };

  const renderEmptyComponent = () => (
    <EmptyStateText>No comments yet. Be the first to comment!</EmptyStateText>
  );

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        data={localComments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <CommentText
              onLongPress={() => handleDeleteComment(index)}
            >
              {item}
            </CommentText>
          </Animated.View>
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
      <TextInput
        placeholder="Write a comment..."
        value={text}
        onChangeText={setText}
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 8,
          marginVertical: 8
        }}
      />
      <Button title="Send" onPress={handleSend} />
    </Container>
  );
}
