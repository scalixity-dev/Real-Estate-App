import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, DataTable, useTheme, ProgressBar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function BudgetScreen() {
  const theme = useTheme();
  const selectedSite = useSelector((state: RootState) => state.sites.selectedSite);
  const bills = useSelector((state: RootState) => state.materials.bills);

  const categories = [
    { name: 'Materials', allocated: 500000, spent: 320000 },
    { name: 'Labor', allocated: 300000, spent: 150000 },
    { name: 'Equipment', allocated: 200000, spent: 180000 },
    { name: 'Services', allocated: 100000, spent: 45000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getProgressColor = (spent: number, allocated: number) => {
    const ratio = spent / allocated;
    if (ratio > 0.9) return theme.colors.error;
    if (ratio > 0.7) return theme.colors.tertiary;
    return theme.colors.primary;
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Budget Overview" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Category</DataTable.Title>
              <DataTable.Title numeric>Allocated</DataTable.Title>
              <DataTable.Title numeric>Spent</DataTable.Title>
              <DataTable.Title>Progress</DataTable.Title>
            </DataTable.Header>

            {categories.map((category) => (
              <DataTable.Row key={category.name}>
                <DataTable.Cell>{category.name}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {formatCurrency(category.allocated)}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {formatCurrency(category.spent)}
                </DataTable.Cell>
                <DataTable.Cell style={styles.progressCell}>
                  <View style={styles.progressContainer}>
                    <ProgressBar
                      progress={category.spent / category.allocated}
                      color={getProgressColor(category.spent, category.allocated)}
                      style={styles.progressBar}
                    />
                    <Text style={styles.progressText}>
                      {Math.round((category.spent / category.allocated) * 100)}%
                    </Text>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Recent Expenses" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Description</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {bills.slice(0, 5).map((bill) => (
              <DataTable.Row key={bill.id}>
                <DataTable.Cell>
                  {new Date(bill.createdAt).toLocaleDateString()}
                </DataTable.Cell>
                <DataTable.Cell>{bill.description}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {formatCurrency(bill.totalAmount)}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
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
  progressCell: {
    flex: 1,
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    minWidth: 40,
    fontSize: 12,
  },
}); 