import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import NewsCard from '../components/NewsCard';
import { useNavigation } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const initialNewsData = [
  {
    id: '1',
    title: 'Steam Big Sale!',
    content: 'Up to 90% discounts on popular games!',
    imageUrl: 'https://i.ytimg.com/vi/ustYwM44qnY/maxresdefault.jpg',
    likes: 0,
    liked: false,
    comments: []
  },
  {
    id: '2',
    title: 'New Update Released',
    content: 'New features added to Steam app!',
    imageUrl: 'https://i.ytimg.com/vi/e8jv24NjOWQ/maxresdefault.jpg',
    likes: 0,
    liked: false,
    comments: []
  },
  {
    id: '3',
    title: 'Community Tournament',
    content: 'Join our weekend tournament!',
    imageUrl: 'https://pbs.twimg.com/media/GZ8_foQaEAAXLP-.jpg:large',
    likes: 0,
    liked: false,
    comments: []
  }
];

export default function CommunityScreen() {
  const [news, setNews] = useState(initialNewsData);
  const navigation = useNavigation();

  const handleLike = (id) => {
    setNews(prevNews =>
      prevNews.map(post =>
        post.id === id && !post.liked
          ? { ...post, likes: post.likes + 1, liked: true }
          : post
      )
    );
  };

  const handleAddComment = (id, comment) => {
    setNews(prevNews =>
      prevNews.map(post =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const handleCommentPress = (post) => {
    navigation.navigate('Comments', {
      postId: post.id,
      comments: post.comments,
      onAddComment: handleAddComment
    });
  };

  const loadMoreNews = () => {
    const moreNews = {
      id: String(news.length + 1),
      title: `Post ${news.length + 1}`,
      content: 'More community updates!',
      imageUrl: `https://picsum.photos/seed/post${news.length + 1}/400/300`,
      likes: 0,
      liked: false,
      comments: []
    };
    setNews([...news, moreNews]);
  };

  return (
    <Container>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            content={item.content}
            imageUrl={item.imageUrl}
            likes={item.likes}
            commentsCount={item.comments.length}
            onLikePress={() => handleLike(item.id)}
            onCommentPress={() => handleCommentPress(item)}
          />
        )}
        onEndReached={loadMoreNews}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
}
