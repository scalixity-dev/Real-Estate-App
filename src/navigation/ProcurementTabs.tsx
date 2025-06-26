import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { IconButton } from 'react-native-paper';
import { ProcurementTabParamList } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import ApprovedRequestsScreen from '../screens/procurement/ApprovedRequestsScreen';
import SubmitPurchaseScreen from '../screens/procurement/SubmitPurchaseScreen';
import HistoryScreen from '../screens/procurement/HistoryScreen';
import ProfileScreen from '../screens/common/ProfileScreen';

const Tab = createBottomTabNavigator<ProcurementTabParamList>();

export default function ProcurementTabs() {
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
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        tabBarStyle: { paddingBottom: 5, height: 60 },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
      }}
    >
      <Tab.Screen
        name="ApprovedRequests"
        component={ApprovedRequestsScreen}
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-check" size={size} color={color} />
          ),
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="SubmitPurchase"
        component={SubmitPurchaseScreen}
        options={{
          title: 'Purchase',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-plus" size={size} color={color} />
          ),
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
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