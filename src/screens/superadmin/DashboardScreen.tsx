import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, useTheme, Button, Surface, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LineChart, PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DashboardScreen() {
  const theme = useTheme();
  const sites = useSelector((state: RootState) => state.sites.sites);

  // Calculate dashboard metrics
  const activeSites = sites.filter(site => site.status === 'active').length;
  const totalPendingBills = sites.reduce((acc, site) => acc + site.pendingBills, 0);
  const totalMaterialsInStock = sites.reduce((acc, site) => ({
    cement: acc.cement + site.materialsInStock.cement,
    steel: acc.steel + site.materialsInStock.steel,
    bricks: acc.bricks + site.materialsInStock.bricks,
    sand: acc.sand + site.materialsInStock.sand,
  }), { cement: 0, steel: 0, bricks: 0, sand: 0 });
  const todayTotalProgress = sites.reduce((acc, site) => acc + site.todayProgress, 0);
  const totalBudget = sites.reduce((acc, site) => acc + site.budget, 0);
  const totalSpent = sites.reduce((acc, site) => acc + site.actualSpent, 0);
  const budgetUsagePercentage = ((totalSpent / totalBudget) * 100).toFixed(1);

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
      {/* Overview Cards */}
      <View style={styles.overviewContainer}>
        <Surface style={styles.overviewCard}>
          <Icon name="office-building" size={32} color={theme.colors.primary} />
          <Text variant="titleLarge" style={styles.overviewNumber}>{activeSites}</Text>
          <Text variant="labelMedium">Active Sites</Text>
        </Surface>

        <Surface style={styles.overviewCard}>
          <Icon name="package-variant" size={32} color={theme.colors.primary} />
          <Text variant="titleLarge" style={styles.overviewNumber}>
            {totalMaterialsInStock.cement + totalMaterialsInStock.steel}
          </Text>
          <Text variant="labelMedium">Materials in Stock</Text>
        </Surface>

        <Surface style={styles.overviewCard}>
          <Icon name="trending-up" size={32} color={theme.colors.primary} />
          <Text variant="titleLarge" style={styles.overviewNumber}>{todayTotalProgress}%</Text>
          <Text variant="labelMedium">Today's Progress</Text>
        </Surface>

        <Surface style={styles.overviewCard}>
          <Icon name="file-document-outline" size={32} color={theme.colors.primary} />
          <Text variant="titleLarge" style={styles.overviewNumber}>{totalPendingBills}</Text>
          <Text variant="labelMedium">Pending Bills</Text>
        </Surface>
      </View>

      <Divider style={styles.divider} />

      {/* Budget Usage */}
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Budget Usage ({budgetUsagePercentage}%)
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

      {/* Cost Breakdown */}
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Cost Breakdown
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

      {/* Active Sites */}
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Active Sites Overview
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sites.filter(site => site.status === 'active').map((site) => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  overviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  overviewCard: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  overviewNumber: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
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