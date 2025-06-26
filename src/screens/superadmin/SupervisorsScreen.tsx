import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Text, 
  Card, 
  FAB, 
  useTheme, 
  Button, 
  Portal, 
  Modal, 
  TextInput,
  Avatar,
  Chip,
  DataTable
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function SupervisorsScreen() {
  const theme = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSupervisorName, setNewSupervisorName] = useState('');
  const [newSupervisorEmail, setNewSupervisorEmail] = useState('');
  const [newSupervisorPhone, setNewSupervisorPhone] = useState('');

  const supervisors = useSelector((state: RootState) => state.sites.supervisors);
  const sites = useSelector((state: RootState) => state.sites.sites);

  const handleAddSupervisor = () => {
    // TODO: Implement supervisor creation
    setIsModalVisible(false);
    setNewSupervisorName('');
    setNewSupervisorEmail('');
    setNewSupervisorPhone('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="headlineMedium">Site Supervisors</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              {supervisors.length} supervisors total
            </Text>
          </Card.Content>
        </Card>

        {supervisors.map((supervisor) => {
          const assignedSites = sites.filter(site => 
            site.supervisorId === supervisor.id
          );

          return (
            <Card key={supervisor.id} style={styles.supervisorCard}>
              <Card.Content>
                <View style={styles.headerRow}>
                  <View style={styles.supervisorInfo}>
                    <Avatar.Text 
                      size={48} 
                      label={supervisor.name.split(' ').map(n => n[0]).join('')} 
                    />
                    <View style={styles.nameContainer}>
                      <Text variant="titleLarge">{supervisor.name}</Text>
                      <Text variant="bodyMedium" style={styles.contactInfo}>
                        {supervisor.email}
                      </Text>
                      <Text variant="bodyMedium" style={styles.contactInfo}>
                        {supervisor.phone}
                      </Text>
                    </View>
                  </View>
                  <Chip 
                    mode="outlined"
                    style={[
                      styles.statusChip,
                      { 
                        borderColor: supervisor.status === 'active' 
                          ? theme.colors.primary 
                          : theme.colors.error 
                      }
                    ]}
                  >
                    {supervisor.status.toUpperCase()}
                  </Chip>
                </View>

                <DataTable style={styles.siteTable}>
                  <DataTable.Header>
                    <DataTable.Title>Assigned Sites</DataTable.Title>
                    <DataTable.Title numeric>Progress</DataTable.Title>
                    <DataTable.Title numeric>Tasks</DataTable.Title>
                  </DataTable.Header>

                  {assignedSites.map((site) => (
                    <DataTable.Row key={site.id}>
                      <DataTable.Cell>{site.name}</DataTable.Cell>
                      <DataTable.Cell numeric>{site.progress}%</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {site.tasks?.length || 0}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}

                  {assignedSites.length === 0 && (
                    <DataTable.Row>
                      <DataTable.Cell>No sites assigned</DataTable.Cell>
                      <DataTable.Cell numeric>-</DataTable.Cell>
                      <DataTable.Cell numeric>-</DataTable.Cell>
                    </DataTable.Row>
                  )}
                </DataTable>
              </Card.Content>
              <Card.Actions>
                <Button 
                  mode="outlined" 
                  onPress={() => {}}
                  style={styles.actionButton}
                >
                  Edit
                </Button>
                <Button 
                  mode="outlined" 
                  onPress={() => {}}
                  style={styles.actionButton}
                  textColor={theme.colors.error}
                >
                  Remove
                </Button>
              </Card.Actions>
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
          <Text variant="titleLarge" style={styles.modalTitle}>
            Add New Supervisor
          </Text>
          <TextInput
            label="Full Name"
            value={newSupervisorName}
            onChangeText={setNewSupervisorName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={newSupervisorEmail}
            onChangeText={setNewSupervisorEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            label="Phone"
            value={newSupervisorPhone}
            onChangeText={setNewSupervisorPhone}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
          />
          <View style={styles.modalActions}>
            <Button 
              mode="contained"
              onPress={handleAddSupervisor}
              style={styles.modalButton}
            >
              Add Supervisor
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
  supervisorCard: {
    margin: 10,
    marginBottom: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  supervisorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 15,
  },
  contactInfo: {
    opacity: 0.7,
    marginTop: 2,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  siteTable: {
    marginTop: 20,
  },
  actionButton: {
    marginRight: 8,
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