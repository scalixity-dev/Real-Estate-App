import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RejectedScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const rejectedBills = useSelector((state: RootState) => 
    state.materials.bills.filter(bill => bill.status === 'rejected')
  );

  const totalAmount = rejectedBills.reduce(
    (sum, bill) => sum + bill.totalAmount,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="headlineMedium">Rejected Bills</Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {rejectedBills.length} bills rejected
          </Text>
          <Text variant="titleLarge" style={styles.totalAmount}>
            Total: ₹{totalAmount.toLocaleString()}
          </Text>
        </Card.Content>
      </Card>

      {rejectedBills.map((bill) => (
        <Card 
          key={bill.id} 
          style={styles.billCard}
          onPress={() => navigation.navigate('BillDetails', { billId: bill.id })}
        >
          <Card.Content>
            <View style={styles.headerRow}>
              <Text variant="titleMedium">Bill #{bill.id}</Text>
              <Text variant="titleMedium" style={{ color: theme.colors.error }}>
                ₹{bill.totalAmount.toLocaleString()}
              </Text>
            </View>

            <Text variant="bodyMedium" style={styles.vendorInfo}>
              Vendor: {bill.vendorId}
            </Text>

            <Text variant="bodySmall" style={styles.date}>
              Created: {new Date(bill.createdAt).toLocaleDateString()}
            </Text>

            <View style={styles.itemsSummary}>
              <Text variant="bodySmall">
                {bill.items.length} items • GST: {bill.gst}%
              </Text>
            </View>
          </Card.Content>
        </Card>
      ))}

      {rejectedBills.length === 0 && (
        <View style={styles.emptyState}>
          <Text variant="bodyLarge">No rejected bills</Text>
        </View>
      )}
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
    color: '#F44336',
  },
  billCard: {
    margin: 10,
    marginBottom: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendorInfo: {
    marginTop: 5,
  },
  date: {
    marginTop: 5,
    opacity: 0.6,
  },
  itemsSummary: {
    marginTop: 10,
    opacity: 0.6,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
}); 