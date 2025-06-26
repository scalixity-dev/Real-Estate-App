import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme, SegmentedButtons } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/authSlice';

type Role = 'superadmin' | 'supervisor' | 'procurement' | 'accountant';

export default function LoginScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('supervisor');

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = async () => {
    if (!username || !password) {
      dispatch(loginFailure('Please fill in all fields'));
      return;
    }

    dispatch(loginStart());

    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      dispatch(loginSuccess({
        user: {
          id: '1',
          name: username,
          email: `${username}@example.com`,
          phone: '+1234567890',
          role: role,
          status: 'active',
        },
        token: 'mock-token',
      }));
    } catch (err) {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Construction Management
        </Text>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          mode="outlined"
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />

        <Text variant="titleMedium" style={styles.roleLabel}>Select Role</Text>
        <SegmentedButtons
          value={role}
          onValueChange={value => setRole(value as Role)}
          buttons={[
            { value: 'superadmin', label: 'Super Admin' },
            { value: 'supervisor', label: 'Supervisor' },
            { value: 'procurement', label: 'Procurement' },
            { value: 'accountant', label: 'Accountant' },
          ]}
          style={styles.roleButtons}
        />

        {error && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  roleLabel: {
    marginBottom: 8,
  },
  roleButtons: {
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 8,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
}); 