import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, useTheme, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LineChart, PieChart } from 'react-native-chart-kit';

export default function DashboardScreen() {
  const theme = useTheme();
  const sites = useSelector((state: RootState) => state.sites.sites);

  // Mock data for charts
  const budgetData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20000, 45000, 28000, 80000, 99000, 43000],
        color: (opacity = 1) => theme.colors.primary,
      },
      {
        data: [15000, 35000, 25000, 70000, 90000, 40000],
        color: (opacity = 1) => theme.colors.secondary,
      },
    ],
    legend: ['Budget', 'Actual'],
  };

  const completionData = [
    {
      name: 'Completed',
      population: 65,
      color: theme.colors.primary,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'In Progress',
      population: 25,
      color: theme.colors.secondary,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Not Started',
      population: 10,
      color: theme.colors.error,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Site Overview
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sites.map((site) => (
            <Card key={site.id} style={styles.siteCard}>
              <Card.Content>
                <Text variant="titleMedium">{site.name}</Text>
                <Text variant="bodyMedium" style={styles.location}>
                  {site.location}
                </Text>
                <View style={styles.statsContainer}>
                  <View style={styles.stat}>
                    <Text variant="labelSmall">Progress</Text>
                    <Text variant="titleSmall">{site.progress}%</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text variant="labelSmall">Budget Used</Text>
                    <Text variant="titleSmall">
                      {((site.actualSpent / site.budget) * 100).toFixed(1)}%
                    </Text>
                  </View>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button mode="outlined" compact>
                  View Details
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Budget Overview
        </Text>
        <Card style={styles.chartCard}>
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

      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Completion Status
        </Text>
        <Card style={styles.chartCard}>
          <Card.Content>
            <PieChart
              data={completionData}
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
  siteCard: {
    width: 280,
    marginRight: 16,
  },
  location: {
    opacity: 0.7,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  chartCard: {
    marginTop: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 