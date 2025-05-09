import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FileViewerScreen from './screens/FileViewerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="File Manager" component={HomeScreen} />
        <Stack.Screen name="Viewer" component={FileViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
