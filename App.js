import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GameProvider } from './contexts/GameContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <GameProvider> {/* Огортаємо все */}
          <AppNavigator />
        </GameProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
