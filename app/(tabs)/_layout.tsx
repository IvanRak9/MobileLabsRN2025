import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tabs } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarShowIcon: true,
      }}
    />
  );
}
