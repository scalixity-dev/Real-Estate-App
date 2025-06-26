import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  useTheme,
  Button,
  FAB,
  Portal,
  Modal,
  TextInput,
  HelperText,
  IconButton,
  Divider,
  Avatar,
  Chip,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  addSupervisor,
  updateSupervisor,
  deleteSupervisor,
  assignSupervisorToSite,
} from '../../store/supervisorsSlice';

export default function SupervisorsScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const supervisors = useSelector((state: RootState) => state.supervisors.supervisors);
  const sites = useSelector((state: RootState) => state.sites.sites);

  const [visible, setVisible] = useState(false);
  const [editingSupervisor, setEditingSupervisor] = useState<any>(null);
  const [supervisorData, setSupervisorData] = useState({
    name: '',
    email: '',
    phone: '',
    assignedSiteId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setEditingSupervisor(null);
    setSupervisorData({
      name: '',
      email: '',
      phone: '',
      assignedSiteId: '',
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!supervisorData.name) newErrors.name = 'Name is required';
    if (!supervisorData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(supervisorData.email)) newErrors.email = 'Invalid email format';
    if (!supervisorData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d-]{10,}$/.test(supervisorData.phone)) newErrors.phone = 'Invalid phone format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const supervisorPayload = {
      id: editingSupervisor ? editingSupervisor.id : Date.now().toString(),
      name: supervisorData.name,
      email: supervisorData.email,
      phone: supervisorData.phone,
      assignedSiteId: supervisorData.assignedSiteId || null,
      status: 'active' as const,
      joinDate: editingSupervisor ? editingSupervisor.joinDate : new Date().toISOString().split('T')[0],
      completedProjects: editingSupervisor ? editingSupervisor.completedProjects : 0,
      rating: editingSupervisor ? editingSupervisor.rating : 0,
    };

    if (editingSupervisor) {
      dispatch(updateSupervisor(supervisorPayload));
    } else {
      dispatch(addSupervisor(supervisorPayload));
    }

    hideModal();
  };

  const handleEdit = (supervisor: any) => {
    setEditingSupervisor(supervisor);
    setSupervisorData({
      name: supervisor.name,
      email: supervisor.email,
      phone: supervisor.phone,
      assignedSiteId: supervisor.assignedSiteId || '',
    });
    showModal();
  };

  const handleDelete = (supervisorId: string) => {
    dispatch(deleteSupervisor(supervisorId));
  };

  const handleAssignSite = (supervisorId: string, siteId: string) => {
    dispatch(assignSupervisorToSite({ supervisorId, siteId }));
  };

  const getAssignedSiteName = (siteId: string | null) => {
    if (!siteId) return 'Not Assigned';
    const site = sites.find(site => site.id === siteId);
    return site ? site.name : 'Unknown Site';
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {supervisors.map((supervisor) => (
          <Card key={supervisor.id} style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <View style={styles.supervisorInfo}>
                  <Avatar.Text
                    size={40}
                    label={supervisor.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  />
                  <View style={styles.nameContainer}>
                    <Text variant="titleMedium">{supervisor.name}</Text>
                    <Text variant="bodySmall" style={styles.email}>
                      {supervisor.email}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardActions}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => handleEdit(supervisor)}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleDelete(supervisor.id)}
                  />
                </View>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text variant="labelSmall">Phone</Text>
                  <Text variant="bodyMedium">{supervisor.phone}</Text>
                </View>
                <View style={styles.stat}>
                  <Text variant="labelSmall">Projects</Text>
                  <Text variant="bodyMedium">{supervisor.completedProjects}</Text>
                </View>
                <View style={styles.stat}>
                  <Text variant="labelSmall">Rating</Text>
                  <Text variant="bodyMedium">{supervisor.rating.toFixed(1)}★</Text>
                </View>
              </View>

              <View style={styles.siteAssignment}>
                <Text variant="labelSmall">Assigned Site</Text>
                <Chip
                  mode="outlined"
                  style={styles.siteChip}
                >
                  {getAssignedSiteName(supervisor.assignedSiteId)}
                </Chip>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            {editingSupervisor ? 'Edit Supervisor' : 'Add New Supervisor'}
          </Text>

          <TextInput
            label="Name"
            value={supervisorData.name}
            onChangeText={(text) => setSupervisorData({ ...supervisorData, name: text })}
            style={styles.input}
            error={!!errors.name}
          />
          <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>

          <TextInput
            label="Email"
            value={supervisorData.email}
            onChangeText={(text) => setSupervisorData({ ...supervisorData, email: text })}
            keyboardType="email-address"
            style={styles.input}
            error={!!errors.email}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Phone"
            value={supervisorData.phone}
            onChangeText={(text) => setSupervisorData({ ...supervisorData, phone: text })}
            keyboardType="phone-pad"
            style={styles.input}
            error={!!errors.phone}
          />
          <HelperText type="error" visible={!!errors.phone}>
            {errors.phone}
          </HelperText>

          <TextInput
            label="Assigned Site ID"
            value={supervisorData.assignedSiteId}
            onChangeText={(text) => setSupervisorData({ ...supervisorData, assignedSiteId: text })}
            style={styles.input}
          />
          <HelperText type="info">
            Leave empty if not assigning to any site
          </HelperText>

          <View style={styles.modalActions}>
            <Button mode="outlined" onPress={hideModal} style={styles.modalButton}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSubmit} style={styles.modalButton}>
              {editingSupervisor ? 'Update' : 'Create'}
            </Button>
          </View>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showModal}
        label="Add Supervisor"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  supervisorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 12,
  },
  email: {
    opacity: 0.7,
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
  },
  divider: {
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  siteAssignment: {
    marginTop: 8,
  },
  siteChip: {
    marginTop: 4,
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
    marginBottom: 4,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    marginLeft: 10,
  },
}); 