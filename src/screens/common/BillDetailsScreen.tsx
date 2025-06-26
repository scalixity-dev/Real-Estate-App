import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'BillDetails'>;

export default function BillDetailsScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const { billId } = route.params;

  // TODO: Fetch bill details from API
  const billDetails = {
    id: billId,
    amount: 1500,
    description: 'Construction materials for Site A',
    date: '2024-03-20',
    status: 'pending',
    vendor: 'ABC Supplies',
    site: 'Site A',
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Bill #{billDetails.id}
          </Text>
          
          <View style={styles.row}>
            <Text variant="labelLarge">Amount:</Text>
            <Text variant="bodyLarge">${billDetails.amount}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Description:</Text>
            <Text variant="bodyLarge">{billDetails.description}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Date:</Text>
            <Text variant="bodyLarge">{billDetails.date}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Status:</Text>
            <Text 
              variant="bodyLarge"
              style={{ 
                color: billDetails.status === 'approved' 
                  ? theme.colors.primary 
                  : theme.colors.error 
              }}
            >
              {billDetails.status.toUpperCase()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Vendor:</Text>
            <Text variant="bodyLarge">{billDetails.vendor}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelLarge">Site:</Text>
            <Text variant="bodyLarge">{billDetails.site}</Text>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button 
            mode="contained" 
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
}); 