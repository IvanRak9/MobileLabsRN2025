import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const Input = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-vertical: 10px;
  font-size: 16px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  margin-bottom: 4px;
`;

const SaveButton = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: #1E90FF;
  padding: 14px;
  border-radius: 12px;
  align-items: center;
`;

const SaveButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default function EditProfileScreen({ route }) {
  const { userData, setUserData } = route.params;
  const [name, setName] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [avatar, setAvatar] = useState(userData.avatarUrl);
  const navigation = useNavigation();

  const handleSave = () => {
    setUserData({ username: name, email, avatarUrl: avatar });
    Alert.alert('Profile updated!');
    navigation.goBack();
  };

  return (
    <Container>
      <Label>Username</Label>
      <Input value={name} onChangeText={setName} placeholder="Enter new username" />

      <Label>Email</Label>
      <Input value={email} onChangeText={setEmail} placeholder="Enter new email" keyboardType="email-address" />

      <Label>Avatar URL</Label>
      <Input value={avatar} onChangeText={setAvatar} placeholder="Enter new avatar URL" />

      <SaveButton onPress={handleSave}>
        <SaveButtonText>Save Changes</SaveButtonText>
      </SaveButton>
    </Container>
  );
}
