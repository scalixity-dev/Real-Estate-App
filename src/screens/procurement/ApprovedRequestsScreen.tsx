import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Card, Text, DataTable, useTheme, Chip } from 'react-native-paper';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ApprovedRequestsScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const requests = useSelector((state: RootState) => 
    state.materials.requests.filter(req => req.status === 'approved')
  );
  const sites = useSelector((state: RootState) => state.sites.sites);

  const getSiteName = (siteId: string) => {
    const site = sites.find(s => s.id === siteId);
    return site ? site.name : 'Unknown Site';
  };

  const handleRequestPress = (requestId: string, siteId: string) => {
    navigation.navigate('RequestDetails', { requestId, siteId });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return theme.colors.error;
      case 'urgent':
        return theme.colors.tertiary;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Approved Material Requests" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Material</DataTable.Title>
              <DataTable.Title numeric>Quantity</DataTable.Title>
              <DataTable.Title>Site</DataTable.Title>
              <DataTable.Title>Urgency</DataTable.Title>
            </DataTable.Header>

            {requests.map((request) => (
              <DataTable.Row 
                key={request.id}
                onPress={() => handleRequestPress(request.id, request.siteId)}
              >
                <DataTable.Cell>{request.materialName}</DataTable.Cell>
                <DataTable.Cell numeric>{request.quantity} {request.unit}</DataTable.Cell>
                <DataTable.Cell>{getSiteName(request.siteId)}</DataTable.Cell>
                <DataTable.Cell>
                  <Chip
                    mode="outlined"
                    selectedColor={getUrgencyColor(request.urgency)}
                  >
                    {request.urgency}
                  </Chip>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            {requests.length === 0 && (
              <DataTable.Row>
                <DataTable.Cell>No approved requests found</DataTable.Cell>
              </DataTable.Row>
            )}
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