import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, useTheme, Button, List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { logout } from '../../store/authSlice';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ApprovedScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const approvedBills = useSelector((state: RootState) => 
    state.materials.bills.filter(bill => bill.status === 'approved')
  );

  const totalAmount = approvedBills.reduce(
    (sum, bill) => sum + bill.totalAmount,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="headlineMedium">Approved Bills</Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {approvedBills.length} bills approved
          </Text>
          <Text variant="titleLarge" style={styles.totalAmount}>
            Total: ₹{totalAmount.toLocaleString()}
          </Text>
        </Card.Content>
      </Card>

      <List.Section>
        {approvedBills.map((bill) => (
          <List.Accordion
            key={bill.id}
            title={`Bill #${bill.id} - ${bill.vendorId}`}
            description={`Date: ${new Date(bill.createdAt).toLocaleDateString()} | Amount: ₹${bill.totalAmount.toLocaleString()}`}
            left={props => <List.Icon {...props} icon="file-check" />}
          >
            {bill.items.map((item, index) => (
              <List.Item
                key={index}
                title={item}
                left={props => <List.Icon {...props} icon="circle-small" />}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>

      {approvedBills.length === 0 && (
        <View style={styles.emptyState}>
          <Text variant="bodyLarge">No approved bills</Text>
        </View>
      )}

      <Card style={[styles.card, styles.logoutCard]}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Account Settings</Text>
          <Button 
            mode="outlined"
            icon="logout"
            onPress={handleLogout}
            style={styles.logoutButton}
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
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    margin: 10,
    elevation: 2,
  },
  subtitle: {
    marginTop: 5,
    opacity: 0.7,
  },
  totalAmount: {
    marginTop: 10,
    color: '#4CAF50',
  },
  card: {
    marginBottom: 16,
  },
  logoutCard: {
    marginTop: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
}); 