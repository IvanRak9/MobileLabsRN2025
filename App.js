import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { CustomThemeProvider } from './themes/ThemeProvider';
import Toast from 'react-native-toast-message'; // <-- додано

export default function App() {
  return (
    <CustomThemeProvider>
      <NavigationContainer>
        <AppNavigator />
        <Toast /> {/* <-- додано */}
      </NavigationContainer>
    </CustomThemeProvider>
  );
}
