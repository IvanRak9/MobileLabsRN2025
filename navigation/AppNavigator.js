import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreScreen from '../screens/StoreScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ChatScreen from '../screens/ChatScreen';
import SafetyScreen from '../screens/SafetyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CommentsScreen from '../screens/CommentsScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeProvider';

const Tab = createBottomTabNavigator();
const CommunityStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function CommunityStackScreen() {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen name="CommunityHome" component={CommunityScreen} options={{ title: 'Community' }} />
      <CommunityStack.Screen name="Comments" component={CommentsScreen} />
    </CommunityStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} options={{ title: 'Profile' }} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
    </ProfileStack.Navigator>
  );
}

export default function AppNavigator() {
  const { isDarkTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Store') {
            iconName = 'storefront';
          } else if (route.name === 'Community') {
            iconName = 'people';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-ellipses';
          } else if (route.name === 'Safety') {
            iconName = 'shield-checkmark';
          } else if (route.name === 'Profile') {
            iconName = 'person-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDarkTheme ? '#ffffff' : '#000000',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkTheme ? '#1e1e1e' : '#ffffff',
        },
      })}
    >
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Community" component={CommunityStackScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
      <Tab.Screen name="Profile">
        {() => <ProfileStackScreen />}
      </Tab.Screen>

    </Tab.Navigator>
  );
}
