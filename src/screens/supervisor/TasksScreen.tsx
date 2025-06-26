import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  useTheme,
  Checkbox,
  Button,
  Divider,
  List,
  IconButton,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Task } from '../../types';

export default function TasksScreen() {
  const theme = useTheme();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
  };

  const TaskDetails = ({ task }: { task: Task }) => (
    <Card style={styles.detailsCard}>
      <Card.Content>
        <Text variant="titleMedium">{task.title}</Text>
        <Text variant="bodyMedium" style={styles.description}>
          {task.description}
        </Text>
        <Divider style={styles.divider} />
        <Text variant="titleSmall">Required Materials:</Text>
        {task.materials.map((material, index) => (
          <List.Item
            key={index}
            title={`Material ID: ${material.materialId}`}
            description={`Quantity: ${material.quantity}`}
            left={props => <List.Icon {...props} icon="package-variant" />}
          />
        ))}
        <Divider style={styles.divider} />
        <View style={styles.deadlineContainer}>
          <Text variant="labelMedium">Deadline:</Text>
          <Text variant="bodyMedium" style={styles.deadline}>
            {new Date(task.deadline).toLocaleDateString()}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => setSelectedTask(null)}>
          Close
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {selectedTask ? (
        <TaskDetails task={selectedTask} />
      ) : (
        <ScrollView>
          <View style={styles.header}>
            <Text variant="headlineSmall">Daily Tasks</Text>
            <IconButton
              icon="plus"
              mode="contained"
              onPress={() => {}}
              style={styles.addButton}
            />
          </View>
          {tasks.map((task) => (
            <Card
              key={task.id}
              style={[
                styles.taskCard,
                task.status === 'completed' && styles.completedCard,
              ]}
              onPress={() => handleTaskPress(task)}
            >
              <Card.Content style={styles.taskContent}>
                <View style={styles.taskHeader}>
                  <Checkbox.Android
                    status={task.status === 'completed' ? 'checked' : 'unchecked'}
                    onPress={() => {}}
                  />
                  <View style={styles.taskTitleContainer}>
                    <Text
                      variant="titleMedium"
                      style={[
                        task.status === 'completed' && styles.completedText,
                      ]}
                    >
                      {task.title}
                    </Text>
                    <Text variant="bodySmall" style={styles.deadline}>
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <View style={styles.statusContainer}>
                  <Text
                    variant="labelSmall"
                    style={[
                      styles.status,
                      {
                        backgroundColor:
                          task.status === 'completed'
                            ? theme.colors.primary
                            : task.status === 'in-progress'
                            ? theme.colors.secondary
                            : theme.colors.error,
                      },
                    ]}
                  >
                    {task.status.toUpperCase()}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    marginLeft: 8,
  },
  taskCard: {
    marginBottom: 12,
  },
  completedCard: {
    opacity: 0.7,
  },
  taskContent: {
    paddingVertical: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  deadline: {
    opacity: 0.7,
    marginTop: 4,
  },
  statusContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: 'white',
    fontSize: 10,
  },
  detailsCard: {
    marginBottom: 16,
  },
  description: {
    marginTop: 8,
    opacity: 0.7,
  },
  divider: {
    marginVertical: 16,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
}); 