import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, DataTable, Chip, useTheme, Button, List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { logout } from '../../store/authSlice';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HistoryScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const bills = useSelector((state: RootState) => state.materials.bills);
  const vendors = useSelector((state: RootState) => state.vendors.vendors);

  const getVendorName = (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor ? vendor.name : 'Unknown Vendor';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return theme.colors.primary;
      case 'rejected':
        return theme.colors.error;
      default:
        return theme.colors.tertiary;
    }
  };

  const handleBillPress = (billId: string) => {
    navigation.navigate('BillDetails', { billId });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Purchase History" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Vendor</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {bills.map((bill) => (
              <DataTable.Row 
                key={bill.id}
                onPress={() => handleBillPress(bill.id)}
              >
                <DataTable.Cell>
                  {new Date(bill.createdAt).toLocaleDateString()}
                </DataTable.Cell>
                <DataTable.Cell>{getVendorName(bill.vendorId)}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {formatCurrency(bill.totalAmount)}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Chip
                    mode="outlined"
                    selectedColor={getStatusColor(bill.status)}
                  >
                    {bill.status}
                  </Chip>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            {bills.length === 0 && (
              <DataTable.Row>
                <DataTable.Cell>No purchase history found</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Summary" />
        <Card.Content>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text variant="headlineMedium">
                {bills.length}
              </Text>
              <Text variant="bodyMedium">Total Purchases</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text variant="headlineMedium">
                {formatCurrency(bills.reduce((sum, bill) => sum + bill.totalAmount, 0))}
              </Text>
              <Text variant="bodyMedium">Total Amount</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text variant="headlineMedium">
                {bills.filter(bill => bill.status === 'approved').length}
              </Text>
              <Text variant="bodyMedium">Approved</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

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
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  summaryItem: {
    alignItems: 'center',
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
}); 