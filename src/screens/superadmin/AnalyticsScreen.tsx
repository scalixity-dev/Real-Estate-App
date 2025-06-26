import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';

export default function AnalyticsScreen() {
  const theme = useTheme();
  const sites = useSelector((state: RootState) => state.sites.sites);

  // Calculate total materials in stock
  const totalMaterialsInStock = sites.reduce(
    (acc, site) => ({
      cement: acc.cement + site.materialsInStock.cement,
      steel: acc.steel + site.materialsInStock.steel,
      bricks: acc.bricks + site.materialsInStock.bricks,
      sand: acc.sand + site.materialsInStock.sand,
    }),
    { cement: 0, steel: 0, bricks: 0, sand: 0 }
  );

  // Mock data for inventory usage over time
  const inventoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [500, 450, 300, 200, 400, totalMaterialsInStock.cement],
        color: (opacity = 1) => theme.colors.primary,
      },
      {
        data: [1200, 1000, 800, 600, 900, totalMaterialsInStock.steel],
        color: (opacity = 1) => theme.colors.secondary,
      },
    ],
    legend: ['Cement (bags)', 'Steel (kg)'],
  };

  // Material requests vs budget data
  const budgetData = {
    labels: sites.map(site => site.name.split(' ')[0]), // Use first word of site name
    datasets: [
      {
        data: sites.map(site => site.budget / 10000), // Convert to smaller unit for better display
        color: (opacity = 1) => theme.colors.primary,
      },
      {
        data: sites.map(site => site.actualSpent / 10000),
        color: (opacity = 1) => theme.colors.secondary,
      },
    ],
    legend: ['Budget', 'Actual Spent'],
  };

  // Cost breakdown data
  const costBreakdownData = [
    {
      name: 'Raw Materials',
      population: 65,
      color: theme.colors.primary,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Labor',
      population: 35,
      color: theme.colors.secondary,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Inventory Usage */}
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Inventory Usage Over Time
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <LineChart
              data={inventoryData}
              width={Dimensions.get('window').width - 48}
              height={220}
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 0,
                color: (opacity = 1) => theme.colors.primary,
                labelColor: (opacity = 1) => theme.colors.onSurface,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: theme.colors.primary,
                },
              }}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>
      </View>

      {/* Material Requests vs Budget */}
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Material Requests vs Budget (in ₹10,000)
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <LineChart
              data={budgetData}
              width={Dimensions.get('window').width - 48}
              height={220}
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 0,
                color: (opacity = 1) => theme.colors.primary,
                labelColor: (opacity = 1) => theme.colors.onSurface,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: theme.colors.primary,
                },
              }}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>
      </View>

      {/* Cost Breakdown */}
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Cost Breakdown (Raw Material vs Labor)
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <PieChart
              data={costBreakdownData}
              width={Dimensions.get('window').width - 48}
              height={220}
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 0,
                color: (opacity = 1) => theme.colors.primary,
                labelColor: (opacity = 1) => theme.colors.onSurface,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </Card.Content>
        </Card>
      </View>

      {/* Task Completion Status */}
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Task Completion Status
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <BarChart
              data={{
                labels: sites.map(site => site.name.split(' ')[0]),
                datasets: [{
                  data: sites.map(site => site.progress),
                }],
              }}
              width={Dimensions.get('window').width - 48}
              height={220}
              yAxisLabel=""
              yAxisSuffix="%"
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 0,
                color: (opacity = 1) => theme.colors.secondary,
                labelColor: (opacity = 1) => theme.colors.onSurface,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.5,
              }}
              style={styles.chart}
            />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  card: {
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 