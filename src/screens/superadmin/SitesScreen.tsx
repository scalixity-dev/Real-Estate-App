import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, FAB, useTheme, Button, Portal, Modal, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SitesScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteAddress, setNewSiteAddress] = useState('');

  const sites = useSelector((state: RootState) => state.sites.sites);

  const handleAddSite = () => {
    // TODO: Implement site creation
    setIsModalVisible(false);
    setNewSiteName('');
    setNewSiteAddress('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="headlineMedium">Construction Sites</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              {sites.length} sites total
            </Text>
          </Card.Content>
        </Card>

        {sites.map((site) => {
          const progressData = {
            labels: ['Progress'],
            data: [site.progress / 100]
          };

          return (
            <Card 
              key={site.id} 
              style={styles.siteCard}
              onPress={() => navigation.navigate('SiteDetails', { siteId: site.id })}
            >
              <Card.Content>
                <View style={styles.headerRow}>
                  <Text variant="titleLarge">{site.name}</Text>
                  <Text 
                    variant="titleMedium" 
                    style={[
                      styles.status,
                      { 
                        color: site.status === 'active' 
                          ? theme.colors.primary 
                          : site.status === 'on-hold'
                          ? theme.colors.secondary
                          : theme.colors.error
                      }
                    ]}
                  >
                    {site.status.toUpperCase()}
                  </Text>
                </View>

                <Text variant="bodyMedium" style={styles.address}>
                  {site.address}
                </Text>

                <View style={styles.progressContainer}>
                  <ProgressChart
                    data={progressData}
                    width={120}
                    height={120}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={{
                      backgroundColor: theme.colors.background,
                      backgroundGradientFrom: theme.colors.background,
                      backgroundGradientTo: theme.colors.background,
                      decimalPlaces: 1,
                      color: (opacity = 1) => theme.colors.primary,
                    }}
                    hideLegend={true}
                  />
                  <View style={styles.statsContainer}>
                    <Text variant="titleMedium">Progress: {site.progress}%</Text>
                    <Text variant="bodyMedium">
                      Budget: ₹{site.totalBudget.toLocaleString()}
                    </Text>
                    <Text variant="bodyMedium">
                      Spent: ₹{site.spentBudget.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>Add New Site</Text>
          <TextInput
            label="Site Name"
            value={newSiteName}
            onChangeText={setNewSiteName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Address"
            value={newSiteAddress}
            onChangeText={setNewSiteAddress}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
          />
          <View style={styles.modalActions}>
            <Button 
              mode="contained"
              onPress={handleAddSite}
              style={styles.modalButton}
            >
              Add Site
            </Button>
            <Button 
              mode="outlined"
              onPress={() => setIsModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => setIsModalVisible(true)}
      />
    </View>
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
  subtitle: {
    marginTop: 5,
    opacity: 0.7,
  },
  siteCard: {
    margin: 10,
    marginBottom: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontWeight: 'bold',
  },
  address: {
    marginTop: 5,
    opacity: 0.7,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  statsContainer: {
    flex: 1,
    marginLeft: 15,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalButton: {
    marginLeft: 10,
  },
}); 