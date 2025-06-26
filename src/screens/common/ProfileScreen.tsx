import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, List, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';

export default function ProfileScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  // Role-specific stats
  const getRoleStats = () => {
    switch (user.role) {
      case 'superadmin':
        return [
          { title: 'Total Sites', value: '12' },
          { title: 'Active Projects', value: '8' },
          { title: 'Total Users', value: '45' },
        ];
      case 'supervisor':
        return [
          { title: 'Active Tasks', value: '15' },
          { title: 'Completed Tasks', value: '23' },
          { title: 'On-time Rate', value: '95%' },
        ];
      case 'procurement':
        return [
          { title: 'Pending Requests', value: '8' },
          { title: 'Completed Orders', value: '156' },
          { title: 'This Month', value: '12' },
        ];
      case 'accountant':
        return [
          { title: 'Pending Bills', value: '12' },
          { title: 'Approved Bills', value: '45' },
          { title: 'This Month', value: '₹2.5M' },
        ];
      default:
        return [];
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.profileHeader}>
          <Avatar.Text 
            size={80} 
            label={user.name.split(' ').map(n => n[0]).join('')} 
          />
          <View style={styles.profileInfo}>
            <Text variant="headlineSmall">{user.name}</Text>
            <Text variant="bodyLarge" style={styles.role}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <List.Section>
            <List.Item
              title="Email"
              description={user.email}
              left={props => <List.Icon {...props} icon="email" />}
            />
            <List.Item
              title="Phone"
              description={user.phone}
              left={props => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
              title="Status"
              description={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              left={props => <List.Icon {...props} icon="account-check" />}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsContainer}>
            {getRoleStats().map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text variant="headlineMedium">{stat.value}</Text>
                <Text variant="bodyMedium">{stat.title}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.actionsCard]}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Account Settings</Text>
          <Button 
            mode="contained"
            icon="account-edit"
            style={styles.button}
            onPress={() => {/* TODO: Implement edit profile */}}
          >
            Edit Profile
          </Button>
          <Button 
            mode="contained-tonal"
            icon="lock-reset"
            style={styles.button}
            onPress={() => {/* TODO: Implement change password */}}
          >
            Change Password
          </Button>
          <Button 
            mode="outlined"
            icon="logout"
            style={styles.button}
            onPress={handleLogout}
          >
            Logout
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  profileInfo: {
    marginLeft: 16,
  },
  role: {
    opacity: 0.7,
    marginTop: 4,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  actionsCard: {
    marginTop: 16,
  },
  button: {
    marginBottom: 12,
  },
}); 