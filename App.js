import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './context/AuthContext';
import GuestStack from './navigation/GuestStack';
import AppStack from './navigation/AppStack';

function MainNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <AppStack /> : <GuestStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
