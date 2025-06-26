import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, DataTable, Button, useTheme } from 'react-native-paper';

export default function ServicesScreen() {
  const theme = useTheme();

  const services = [
    { id: '1', name: 'Plumbing', status: 'available' },
    { id: '2', name: 'Electrical', status: 'in-progress' },
    { id: '3', name: 'Carpentry', status: 'available' },
    { id: '4', name: 'Masonry', status: 'unavailable' },
    { id: '5', name: 'Painting', status: 'available' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return theme.colors.primary;
      case 'in-progress':
        return theme.colors.tertiary;
      case 'unavailable':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Available Services" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Service</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>

            {services.map((service) => (
              <DataTable.Row key={service.id}>
                <DataTable.Cell>{service.name}</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{ color: getStatusColor(service.status) }}>
                    {service.status}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    mode="contained"
                    disabled={service.status !== 'available'}
                    onPress={() => {}}
                    compact
                  >
                    Request
                  </Button>
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
}); 