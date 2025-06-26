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
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addSite, updateSite, deleteSite } from '../../store/sitesSlice';

export default function SitesScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const sites = useSelector((state: RootState) => state.sites.sites);
  
  const [visible, setVisible] = useState(false);
  const [editingSite, setEditingSite] = useState<any>(null);
  const [siteData, setSiteData] = useState({
    name: '',
    location: '',
    budget: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setEditingSite(null);
    setSiteData({
      name: '',
      location: '',
      budget: '',
      startDate: '',
      endDate: '',
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!siteData.name) newErrors.name = 'Site name is required';
    if (!siteData.location) newErrors.location = 'Location is required';
    if (!siteData.budget) newErrors.budget = 'Budget is required';
    else if (isNaN(Number(siteData.budget))) newErrors.budget = 'Budget must be a number';
    if (!siteData.startDate) newErrors.startDate = 'Start date is required';
    if (!siteData.endDate) newErrors.endDate = 'End date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const sitePayload = {
      id: editingSite ? editingSite.id : Date.now().toString(),
      name: siteData.name,
      location: siteData.location,
      budget: Number(siteData.budget),
      startDate: siteData.startDate,
      endDate: siteData.endDate,
      progress: editingSite ? editingSite.progress : 0,
      actualSpent: editingSite ? editingSite.actualSpent : 0,
      supervisorId: editingSite ? editingSite.supervisorId : null,
      status: 'active' as const,
      materialsInStock: editingSite ? editingSite.materialsInStock : {
        cement: 0,
        steel: 0,
        bricks: 0,
        sand: 0,
      },
      pendingBills: editingSite ? editingSite.pendingBills : 0,
      todayProgress: editingSite ? editingSite.todayProgress : 0,
    };

    if (editingSite) {
      dispatch(updateSite(sitePayload));
    } else {
      dispatch(addSite(sitePayload));
    }

    hideModal();
  };

  const handleEdit = (site: any) => {
    setEditingSite(site);
    setSiteData({
      name: site.name,
      location: site.location,
      budget: site.budget.toString(),
      startDate: site.startDate,
      endDate: site.endDate,
    });
    showModal();
  };

  const handleDelete = (siteId: string) => {
    dispatch(deleteSite(siteId));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {sites.map((site) => (
          <Card key={site.id} style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <View>
                  <Text variant="titleLarge">{site.name}</Text>
                  <Text variant="bodyMedium" style={styles.location}>
                    {site.location}
                  </Text>
                </View>
                <View style={styles.cardActions}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => handleEdit(site)}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleDelete(site.id)}
                  />
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text variant="labelSmall">Budget</Text>
                  <Text variant="titleSmall">₹{site.budget.toLocaleString()}</Text>
                </View>
                <View style={styles.stat}>
                  <Text variant="labelSmall">Progress</Text>
                  <Text variant="titleSmall">{site.progress}%</Text>
                </View>
                <View style={styles.stat}>
                  <Text variant="labelSmall">Start Date</Text>
                  <Text variant="titleSmall">{site.startDate}</Text>
                </View>
                <View style={styles.stat}>
                  <Text variant="labelSmall">End Date</Text>
                  <Text variant="titleSmall">{site.endDate}</Text>
                </View>
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
            {editingSite ? 'Edit Site' : 'Add New Site'}
          </Text>
          
          <TextInput
            label="Site Name"
            value={siteData.name}
            onChangeText={(text) => setSiteData({ ...siteData, name: text })}
            style={styles.input}
            error={!!errors.name}
          />
          <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>

          <TextInput
            label="Location"
            value={siteData.location}
            onChangeText={(text) => setSiteData({ ...siteData, location: text })}
            style={styles.input}
            error={!!errors.location}
          />
          <HelperText type="error" visible={!!errors.location}>
            {errors.location}
          </HelperText>

          <TextInput
            label="Budget"
            value={siteData.budget}
            onChangeText={(text) => setSiteData({ ...siteData, budget: text })}
            keyboardType="numeric"
            style={styles.input}
            error={!!errors.budget}
          />
          <HelperText type="error" visible={!!errors.budget}>
            {errors.budget}
          </HelperText>

          <TextInput
            label="Start Date (YYYY-MM-DD)"
            value={siteData.startDate}
            onChangeText={(text) => setSiteData({ ...siteData, startDate: text })}
            style={styles.input}
            error={!!errors.startDate}
          />
          <HelperText type="error" visible={!!errors.startDate}>
            {errors.startDate}
          </HelperText>

          <TextInput
            label="End Date (YYYY-MM-DD)"
            value={siteData.endDate}
            onChangeText={(text) => setSiteData({ ...siteData, endDate: text })}
            style={styles.input}
            error={!!errors.endDate}
          />
          <HelperText type="error" visible={!!errors.endDate}>
            {errors.endDate}
          </HelperText>

          <View style={styles.modalActions}>
            <Button mode="outlined" onPress={hideModal} style={styles.modalButton}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSubmit} style={styles.modalButton}>
              {editingSite ? 'Update' : 'Create'}
            </Button>
          </View>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showModal}
        label="Add Site"
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
  cardActions: {
    flexDirection: 'row',
  },
  location: {
    opacity: 0.7,
    marginTop: 4,
  },
  divider: {
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stat: {
    alignItems: 'center',
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