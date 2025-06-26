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
  actionsCard: {
    marginTop: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 12,
  },
}); 