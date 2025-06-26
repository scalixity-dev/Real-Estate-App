import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Text, 
  Card, 
  useTheme, 
  Chip,
  DataTable,
  SegmentedButtons
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function BillingScreen() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('month');

  const bills = useSelector((state: RootState) => state.materials.bills);
  const sites = useSelector((state: RootState) => state.sites.sites);

  // Calculate total amounts
  const totalAmount = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const pendingAmount = bills
    .filter(bill => bill.status === 'pending')
    .reduce((sum, bill) => sum + bill.totalAmount, 0);
  const approvedAmount = bills
    .filter(bill => bill.status === 'approved')
    .reduce((sum, bill) => sum + bill.totalAmount, 0);

  // Prepare chart data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20000, 45000, 28000, 80000, 99000, 43000],
        color: (opacity = 1) => theme.colors.primary,
      }
    ]
  };

  const siteExpenses = sites.map(site => ({
    name: site.name,
    amount: bills
      .filter(bill => bill.status === 'approved')
      .reduce((sum, bill) => sum + bill.totalAmount, 0),
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12
  }));

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="headlineMedium">Billing Overview</Text>
          <View style={styles.amountRow}>
            <View style={styles.amountBox}>
              <Text variant="titleMedium">Total Amount</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                ₹{totalAmount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.amountBox}>
              <Text variant="titleMedium">Pending</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.secondary }}>
                ₹{pendingAmount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.amountBox}>
              <Text variant="titleMedium">Approved</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                ₹{approvedAmount.toLocaleString()}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.chartTitle}>Expense Trend</Text>
          <SegmentedButtons
            value={timeRange}
            onValueChange={setTimeRange}
            buttons={[
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' },
            ]}
            style={styles.timeRangeSelector}
          />
          <LineChart
            data={monthlyData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: theme.colors.background,
              backgroundGradientFrom: theme.colors.background,
              backgroundGradientTo: theme.colors.background,
              decimalPlaces: 0,
              color: (opacity = 1) => theme.colors.primary,
              labelColor: (opacity = 1) => theme.colors.onBackground,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: theme.colors.primary
              }
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.chartTitle}>Site-wise Expenses</Text>
          <PieChart
            data={siteExpenses}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: theme.colors.background,
              backgroundGradientFrom: theme.colors.background,
              backgroundGradientTo: theme.colors.background,
              decimalPlaces: 0,
              color: (opacity = 1) => theme.colors.primary,
              labelColor: (opacity = 1) => theme.colors.onBackground,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card.Content>
      </Card>

      <Card style={styles.tableCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.tableTitle}>Recent Bills</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Bill #</DataTable.Title>
              <DataTable.Title>Vendor</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {bills.slice(0, 5).map((bill) => (
              <DataTable.Row key={bill.id}>
                <DataTable.Cell>{bill.id}</DataTable.Cell>
                <DataTable.Cell>{bill.vendorId}</DataTable.Cell>
                <DataTable.Cell numeric>
                  ₹{bill.totalAmount.toLocaleString()}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Chip 
                    mode="outlined"
                    style={[
                      styles.statusChip,
                      { 
                        borderColor: bill.status === 'approved' 
                          ? theme.colors.primary 
                          : bill.status === 'pending'
                          ? theme.colors.secondary
                          : theme.colors.error 
                      }
                    ]}
                  >
                    {bill.status.toUpperCase()}
                  </Chip>
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
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    margin: 10,
    elevation: 2,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  amountBox: {
    flex: 1,
    alignItems: 'center',
  },
  chartCard: {
    margin: 10,
    marginBottom: 5,
    elevation: 2,
  },
  chartTitle: {
    marginBottom: 15,
  },
  timeRangeSelector: {
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tableCard: {
    margin: 10,
    marginBottom: 20,
    elevation: 2,
  },
  tableTitle: {
    marginBottom: 15,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
}); 