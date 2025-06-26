import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, List } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestDetails'>;

export default function RequestDetailsScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const { requestId } = route.params;

  // TODO: Fetch request details from API
  const requestDetails = {
    id: requestId,
    type: 'Material Request',
    status: 'pending',
    date: '2024-03-20',
    site: 'Site A',
    requestedBy: 'John Doe',
    items: [
      { id: '1', name: 'Cement', quantity: 50, unit: 'bags' },
      { id: '2', name: 'Steel Bars', quantity: 100, unit: 'pieces' },
      { id: '3', name: 'Sand', quantity: 20, unit: 'tons' },
    ],
    urgency: 'high',
    notes: 'Need these materials by next week for foundation work',
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {requestDetails.type} #{requestDetails.id}
          </Text>

          <View style={styles.row}>
            <Text variant="labelLarge">Status:</Text>
            <Text 
              variant="bodyLarge"
              style={{ 
                color: requestDetails.status === 'approved' 
                  ? theme.colors.primary 
                  : theme.colors.error 
              }}
            >
              {requestDetails.status.toUpperCase()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Date:</Text>
            <Text variant="bodyLarge">{requestDetails.date}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Site:</Text>
            <Text variant="bodyLarge">{requestDetails.site}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Requested By:</Text>
            <Text variant="bodyLarge">{requestDetails.requestedBy}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Urgency:</Text>
            <Text 
              variant="bodyLarge"
              style={{ 
                color: requestDetails.urgency === 'high' 
                  ? theme.colors.error 
                  : theme.colors.primary 
              }}
            >
              {requestDetails.urgency.toUpperCase()}
            </Text>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Requested Items
          </Text>

          <List.Section>
            {requestDetails.items.map(item => (
              <List.Item
                key={item.id}
                title={item.name}
                description={`${item.quantity} ${item.unit}`}
                left={props => <List.Icon {...props} icon="package" />}
              />
            ))}
          </List.Section>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Notes
          </Text>
          <Text variant="bodyMedium">{requestDetails.notes}</Text>
        </Card.Content>

        <Card.Actions>
          {requestDetails.status === 'pending' && (
            <>
              <Button 
                mode="contained" 
                onPress={() => {/* TODO: Implement approval */}}
              >
                Approve
              </Button>
              <Button 
                mode="contained-tonal" 
                onPress={() => {/* TODO: Implement rejection */}}
              >
                Reject
              </Button>
            </>
          )}
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
}); 