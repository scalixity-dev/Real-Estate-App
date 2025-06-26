import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, List, ProgressBar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SiteDetails'>;

export default function SiteDetailsScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const { siteId } = route.params;

  // TODO: Fetch site details from API
  const siteDetails = {
    id: siteId,
    name: 'Site A',
    location: '123 Construction Ave, City',
    supervisor: 'John Doe',
    startDate: '2024-01-01',
    expectedEndDate: '2024-12-31',
    status: 'in_progress',
    progress: 0.35,
    budget: {
      total: 1000000,
      spent: 350000,
      remaining: 650000,
    },
    tasks: [
      { id: '1', name: 'Foundation Work', status: 'completed', progress: 1 },
      { id: '2', name: 'Structural Work', status: 'in_progress', progress: 0.6 },
      { id: '3', name: 'Electrical Work', status: 'not_started', progress: 0 },
      { id: '4', name: 'Plumbing Work', status: 'not_started', progress: 0 },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {siteDetails.name}
          </Text>

          <View style={styles.row}>
            <Text variant="labelLarge">Status:</Text>
            <Text 
              variant="bodyLarge"
              style={{ 
                color: siteDetails.status === 'completed' 
                  ? theme.colors.primary 
                  : theme.colors.secondary 
              }}
            >
              {siteDetails.status.replace('_', ' ').toUpperCase()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Location:</Text>
            <Text variant="bodyLarge">{siteDetails.location}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Supervisor:</Text>
            <Text variant="bodyLarge">{siteDetails.supervisor}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Start Date:</Text>
            <Text variant="bodyLarge">{siteDetails.startDate}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Expected End Date:</Text>
            <Text variant="bodyLarge">{siteDetails.expectedEndDate}</Text>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Overall Progress
          </Text>
          <ProgressBar 
            progress={siteDetails.progress} 
            style={styles.progressBar} 
          />
          <Text variant="bodyMedium" style={styles.progressText}>
            {Math.round(siteDetails.progress * 100)}% Complete
          </Text>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Budget Overview
          </Text>
          <View style={styles.budgetContainer}>
            <View style={styles.budgetItem}>
              <Text variant="labelLarge">Total</Text>
              <Text variant="bodyLarge">₹{siteDetails.budget.total}</Text>
            </View>
            <View style={styles.budgetItem}>
              <Text variant="labelLarge">Spent</Text>
              <Text variant="bodyLarge">₹{siteDetails.budget.spent}</Text>
            </View>
            <View style={styles.budgetItem}>
              <Text variant="labelLarge">Remaining</Text>
              <Text variant="bodyLarge">₹{siteDetails.budget.remaining}</Text>
            </View>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Tasks
          </Text>
          <List.Section>
            {siteDetails.tasks.map(task => (
              <List.Item
                key={task.id}
                title={task.name}
                description={`${Math.round(task.progress * 100)}% Complete`}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon={
                      task.status === 'completed' 
                        ? 'check-circle' 
                        : task.status === 'in_progress' 
                        ? 'progress-clock' 
                        : 'clock-outline'
                    } 
                  />
                )}
                onPress={() => navigation.navigate('TaskDetails', { taskId: task.id })}
              />
            ))}
          </List.Section>
        </Card.Content>

        <Card.Actions>
          <Button 
            mode="outlined" 
            onPress={() => navigation.goBack()}
          >
            Back
          </Button>
        </Card.Actions>
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
  title: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
  },
  budgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  budgetItem: {
    alignItems: 'center',
  },
}); 