import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, List, ProgressBar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

export default function TaskDetailsScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const { taskId } = route.params;

  // TODO: Fetch task details from API
  const taskDetails = {
    id: taskId,
    name: 'Foundation Work',
    description: 'Complete the foundation work including excavation and concrete pouring',
    status: 'in_progress',
    progress: 0.65,
    startDate: '2024-02-01',
    dueDate: '2024-03-15',
    assignedTo: 'John Smith',
    priority: 'high',
    site: 'Site A',
    subtasks: [
      { id: '1', name: 'Site Excavation', status: 'completed', progress: 1 },
      { id: '2', name: 'Reinforcement Setup', status: 'completed', progress: 1 },
      { id: '3', name: 'Concrete Pouring', status: 'in_progress', progress: 0.3 },
      { id: '4', name: 'Curing', status: 'not_started', progress: 0 },
    ],
    materials: [
      { id: '1', name: 'Cement', quantity: '50 bags', status: 'delivered' },
      { id: '2', name: 'Steel Bars', quantity: '2 tons', status: 'pending' },
      { id: '3', name: 'Sand', quantity: '3 trucks', status: 'delivered' },
    ],
    comments: [
      { id: '1', user: 'John Smith', text: 'Started excavation work', date: '2024-02-01' },
      { id: '2', user: 'Jane Doe', text: 'Reinforcement materials delivered', date: '2024-02-15' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {taskDetails.name}
          </Text>

          <View style={styles.row}>
            <Text variant="labelLarge">Status:</Text>
            <Text 
              variant="bodyLarge"
              style={{ 
                color: taskDetails.status === 'completed' 
                  ? theme.colors.primary 
                  : taskDetails.status === 'in_progress'
                  ? theme.colors.secondary
                  : theme.colors.error 
              }}
            >
              {taskDetails.status.replace('_', ' ').toUpperCase()}
            </Text>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Progress
          </Text>
          <ProgressBar 
            progress={taskDetails.progress} 
            style={styles.progressBar} 
          />
          <Text variant="bodyMedium" style={styles.progressText}>
            {Math.round(taskDetails.progress * 100)}% Complete
          </Text>

          <View style={styles.row}>
            <Text variant="labelLarge">Site:</Text>
            <Text variant="bodyLarge">{taskDetails.site}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Assigned To:</Text>
            <Text variant="bodyLarge">{taskDetails.assignedTo}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Priority:</Text>
            <Text 
              variant="bodyLarge"
              style={{ 
                color: taskDetails.priority === 'high' 
                  ? theme.colors.error 
                  : theme.colors.primary 
              }}
            >
              {taskDetails.priority.toUpperCase()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Start Date:</Text>
            <Text variant="bodyLarge">{taskDetails.startDate}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Due Date:</Text>
            <Text variant="bodyLarge">{taskDetails.dueDate}</Text>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Description
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {taskDetails.description}
          </Text>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Subtasks
          </Text>
          <List.Section>
            {taskDetails.subtasks.map(subtask => (
              <List.Item
                key={subtask.id}
                title={subtask.name}
                description={`${Math.round(subtask.progress * 100)}% Complete`}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon={
                      subtask.status === 'completed' 
                        ? 'check-circle' 
                        : subtask.status === 'in_progress' 
                        ? 'progress-clock' 
                        : 'clock-outline'
                    } 
                  />
                )}
              />
            ))}
          </List.Section>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Required Materials
          </Text>
          <List.Section>
            {taskDetails.materials.map(material => (
              <List.Item
                key={material.id}
                title={material.name}
                description={material.quantity}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon={
                      material.status === 'delivered' 
                        ? 'package-variant-closed-check' 
                        : 'package-variant'
                    } 
                  />
                )}
              />
            ))}
          </List.Section>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Comments
          </Text>
          <List.Section>
            {taskDetails.comments.map(comment => (
              <List.Item
                key={comment.id}
                title={comment.user}
                description={comment.text}
                descriptionNumberOfLines={2}
                left={props => <List.Icon {...props} icon="comment" />}
              />
            ))}
          </List.Section>
        </Card.Content>

        <Card.Actions>
          <Button 
            mode="contained" 
            onPress={() => {/* TODO: Implement update status */}}
          >
            Update Status
          </Button>
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
  description: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
}); 