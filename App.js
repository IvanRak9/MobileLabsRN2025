import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OneSignal from 'react-native-onesignal';
import ToDoScreen from './screens/ToDoScreen';
import LoginScreen from './screens/LoginScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createNativeStackNavigator();

const ONESIGNAL_APP_ID = '4d07039c-c4c9-44c7-a2b1-d0784bab7af3';

export default function App() {
  useEffect(() => {
    OneSignal.setAppId(ONESIGNAL_APP_ID);
    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('Notification opened:', notification);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ToDo" component={ToDoScreen} />
        <Stack.Screen name="Login" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
