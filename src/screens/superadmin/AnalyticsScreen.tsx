import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Text, 
  Card, 
  useTheme,
  ProgressBar,
  DataTable,
  SegmentedButtons,
  Button
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { logout } from '../../store/authSlice';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('month');
  const dispatch = useDispatch();

  const sites = useSelector((state: RootState) => state.sites.sites);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const bills = useSelector((state: RootState) => state.materials.bills);

  // Calculate overall progress
  const totalSites = sites.length || 1; // Prevent division by zero
  const completedSites = sites.filter(site => site.status === 'completed').length;
  const averageProgress = sites.length > 0 
    ? sites.reduce((sum, site) => sum + (site.progress || 0), 0) / totalSites
    : 0;

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  // Calculate budget utilization
  const totalBudget = sites.reduce((sum, site) => sum + (site.totalBudget || 0), 0);
  const totalSpent = sites.reduce((sum, site) => sum + (site.spentBudget || 0), 0);
  const budgetUtilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const safeProgress = (value: number) => {
    const progress = Math.min(Math.max(value, 0), 100) / 100;
    return isNaN(progress) ? 0 : progress;
  };

  // Prepare chart data
  const taskProgressData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, pendingTasks],
      }
    ]
  };

  const monthlyProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [30, 45, 58, 65, 78, 85],
        color: (opacity = 1) => theme.colors.primary,
      }
    ]
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="headlineMedium">Project Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statsBox}>
              <Text variant="titleMedium">Total Sites</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                {totalSites}
              </Text>
            </View>
            <View style={styles.statsBox}>
              <Text variant="titleMedium">Completed</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                {completedSites}
              </Text>
            </View>
            <View style={styles.statsBox}>
              <Text variant="titleMedium">Active</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                {totalSites - completedSites}
              </Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text variant="titleMedium">Overall Progress</Text>
              <Text variant="titleMedium">{averageProgress.toFixed(1)}%</Text>
            </View>
            <ProgressBar 
              progress={safeProgress(averageProgress)}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.chartTitle}>Task Distribution</Text>
          <BarChart
            data={taskProgressData}
            width={screenWidth - 60}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
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
              barPercentage: 0.5,
            }}
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.chartTitle}>Progress Trend</Text>
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
            data={monthlyProgressData}
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

      <Card style={styles.budgetCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.chartTitle}>Budget Overview</Text>
          <View style={styles.budgetRow}>
            <View style={styles.budgetBox}>
              <Text variant="titleMedium">Total Budget</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                ₹{totalBudget.toLocaleString()}
              </Text>
            </View>
            <View style={styles.budgetBox}>
              <Text variant="titleMedium">Spent</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.secondary }}>
                ₹{totalSpent.toLocaleString()}
              </Text>
            </View>
          </View>
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text variant="titleMedium">Budget Utilization</Text>
              <Text variant="titleMedium">{budgetUtilization.toFixed(1)}%</Text>
            </View>
            <ProgressBar 
              progress={safeProgress(budgetUtilization)}
              color={theme.colors.secondary}
              style={styles.progressBar}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.tableCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.tableTitle}>Site Performance</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Site</DataTable.Title>
              <DataTable.Title numeric>Progress</DataTable.Title>
              <DataTable.Title numeric>Tasks</DataTable.Title>
              <DataTable.Title numeric>Budget Used</DataTable.Title>
            </DataTable.Header>

            {sites.map((site) => {
              const siteTasks = tasks.filter(task => task.siteId === site.id);
              const budgetUsedPercent = site.totalBudget > 0
                ? ((site.spentBudget || 0) / site.totalBudget) * 100
                : 0;

              return (
                <DataTable.Row key={site.id}>
                  <DataTable.Cell>{site.name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <ProgressBar
                      progress={safeProgress(site.progress || 0)}
                      color={theme.colors.primary}
                      style={[styles.progressBar, { width: 60 }]}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{siteTasks.length}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <ProgressBar
                      progress={safeProgress(budgetUsedPercent)}
                      color={theme.colors.secondary}
                      style={[styles.progressBar, { width: 60 }]}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.logoutCard]}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.logoutTitle}>Account Settings</Text>
          <Button 
            mode="contained-tonal"
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statsBox: {
    flex: 1,
    alignItems: 'center',
  },
  progressSection: {
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
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
  budgetCard: {
    margin: 10,
    marginBottom: 5,
    elevation: 2,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  budgetBox: {
    alignItems: 'center',
  },
  tableCard: {
    margin: 10,
    marginBottom: 20,
    elevation: 2,
  },
  tableTitle: {
    marginBottom: 15,
  },
  card: {
    marginBottom: 16,
  },
  logoutCard: {
    marginTop: 32,
  },
  logoutTitle: {
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
}); 