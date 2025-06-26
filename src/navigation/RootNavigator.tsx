import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreSession } from '../store/authSlice';

// Import screens and navigators
import LoginScreen from '../screens/auth/LoginScreen';
import SuperAdminTabs from './SuperAdminTabs';
import SupervisorTabs from './SupervisorTabs';
import ProcurementTabs from './ProcurementTabs';
import AccountantTabs from './AccountantTabs';
import BillDetailsScreen from '../screens/common/BillDetailsScreen';
import RequestDetailsScreen from '../screens/common/RequestDetailsScreen';
import SiteDetailsScreen from '../screens/common/SiteDetailsScreen';
import TaskDetailsScreen from '../screens/common/TaskDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const restoreUserSession = async () => {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem('user'),
          AsyncStorage.getItem('token'),
        ]);

        if (storedUser && storedToken) {
          dispatch(restoreSession({
            user: JSON.parse(storedUser),
            token: storedToken,
          }));
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
      }
    };

    restoreUserSession();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            {user.role === 'superadmin' && (
              <Stack.Screen name="SuperAdminTabs" component={SuperAdminTabs} />
            )}
            {user.role === 'supervisor' && (
              <Stack.Screen name="SupervisorTabs" component={SupervisorTabs} />
            )}
            {user.role === 'procurement' && (
              <Stack.Screen name="ProcurementTabs" component={ProcurementTabs} />
            )}
            {user.role === 'accountant' && (
              <Stack.Screen name="AccountantTabs" component={AccountantTabs} />
            )}
            <Stack.Group screenOptions={{ headerShown: true }}>
              <Stack.Screen name="SiteDetails" component={SiteDetailsScreen} />
              <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
              <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
              <Stack.Screen name="BillDetails" component={BillDetailsScreen} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 