import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SuperAdminTabParamList } from './types';

// Screens
import DashboardScreen from '../screens/superadmin/DashboardScreen';
import SitesScreen from '../screens/superadmin/SitesScreen';
import SupervisorsScreen from '../screens/superadmin/SupervisorsScreen';
import VendorsScreen from '../screens/superadmin/VendorsScreen';
import BillingScreen from '../screens/superadmin/BillingScreen';
import AnalyticsScreen from '../screens/superadmin/AnalyticsScreen';
import ProfileScreen from '../screens/common/ProfileScreen';

const Tab = createBottomTabNavigator<SuperAdminTabParamList>();

export default function SuperAdminTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        tabBarStyle: { paddingBottom: 5, height: 60 },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Sites"
        component={SitesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="office-building" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Supervisors"
        component={SupervisorsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-hard-hat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Vendors"
        component={VendorsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="truck" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Billing"
        component={BillingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="currency-usd" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-bar" size={size} color={color} />
          ),
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