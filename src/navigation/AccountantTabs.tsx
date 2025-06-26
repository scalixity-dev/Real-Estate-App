import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { IconButton } from 'react-native-paper';
import { AccountantTabParamList } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import PendingScreen from '../screens/accountant/PendingScreen';
import ApprovedScreen from '../screens/accountant/ApprovedScreen';
import RejectedScreen from '../screens/accountant/RejectedScreen';
import ProfileScreen from '../screens/common/ProfileScreen';

const Tab = createBottomTabNavigator<AccountantTabParamList>();

export default function AccountantTabs() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(logout());
  };

  const LogoutButton = () => (
    <IconButton
      icon="logout"
      onPress={handleLogout}
      style={{ marginRight: 8 }}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.backdrop,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
      }}
    >
      <Tab.Screen
        name="Pending"
        component={PendingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock-outline" size={size} color={color} />
          ),
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="Approved"
        component={ApprovedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="check-circle" size={size} color={color} />
          ),
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="Rejected"
        component={RejectedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="close-circle" size={size} color={color} />
          ),
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 