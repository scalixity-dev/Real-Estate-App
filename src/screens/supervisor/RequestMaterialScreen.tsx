import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, Text, Card, useTheme, DataTable } from 'react-native-paper';
import { MaterialRequest } from '../../types';
import { RootState } from '../../store';
import { addRequest } from '../../store/materialsSlice';

export default function RequestMaterialScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedSite = useSelector((state: RootState) => state.sites.selectedSite);

  const [materialName, setMaterialName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!selectedSite) {
      // Show error that site must be selected
      return;
    }

    const newRequest: MaterialRequest = {
      id: Date.now().toString(), // In real app, this would come from backend
      siteId: selectedSite.id,
      materialName,
      quantity: parseFloat(quantity),
      unit,
      urgency: urgency as 'normal' | 'urgent' | 'critical',
      status: 'pending',
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addRequest(newRequest));
    
    // Reset form
    setMaterialName('');
    setQuantity('');
    setUnit('');
    setUrgency('normal');
    setNotes('');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Request Materials" />
        <Card.Content>
          <TextInput
            label="Material Name"
            value={materialName}
            onChangeText={setMaterialName}
            style={styles.input}
          />
          <View style={styles.row}>
            <TextInput
              label="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <TextInput
              label="Unit"
              value={unit}
              onChangeText={setUnit}
              style={[styles.input, styles.flex1]}
            />
          </View>
          <Text style={styles.label}>Urgency Level</Text>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>
                <Button
                  mode={urgency === 'normal' ? 'contained' : 'outlined'}
                  onPress={() => setUrgency('normal')}
                >
                  Normal
                </Button>
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  mode={urgency === 'urgent' ? 'contained' : 'outlined'}
                  onPress={() => setUrgency('urgent')}
                >
                  Urgent
                </Button>
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  mode={urgency === 'critical' ? 'contained' : 'outlined'}
                  onPress={() => setUrgency('critical')}
                >
                  Critical
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          <TextInput
            label="Additional Notes"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={!materialName || !quantity || !unit}
          >
            Submit Request
          </Button>
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
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
  },
}); 