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

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  gstNumber: string;
  totalBills: number;
  totalAmount: number;
}

export default function VendorsScreen() {
  const theme = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorEmail, setNewVendorEmail] = useState('');
  const [newVendorPhone, setNewVendorPhone] = useState('');
  const [newVendorAddress, setNewVendorAddress] = useState('');
  const [newVendorGst, setNewVendorGst] = useState('');

  // TODO: Add vendors to Redux state
  const vendors: Vendor[] = [];
  const bills = useSelector((state: RootState) => state.materials.bills);

  const handleAddVendor = () => {
    // TODO: Implement vendor creation
    setIsModalVisible(false);
    setNewVendorName('');
    setNewVendorEmail('');
    setNewVendorPhone('');
    setNewVendorAddress('');
    setNewVendorGst('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="headlineMedium">Vendors</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              {vendors.length} vendors total
            </Text>
          </Card.Content>
        </Card>

        {vendors.map((vendor) => {
          const vendorBills = bills.filter(bill => bill.vendorId === vendor.id);
          const totalAmount = vendorBills.reduce(
            (sum, bill) => sum + bill.totalAmount,
            0
          );

          return (
            <Card key={vendor.id} style={styles.vendorCard}>
              <Card.Content>
                <View style={styles.headerRow}>
                  <View style={styles.vendorInfo}>
                    <Avatar.Text 
                      size={48} 
                      label={vendor.name.split(' ').map(n => n[0]).join('')} 
                    />
                    <View style={styles.nameContainer}>
                      <Text variant="titleLarge">{vendor.name}</Text>
                      <Text variant="bodyMedium" style={styles.contactInfo}>
                        {vendor.email}
                      </Text>
                      <Text variant="bodyMedium" style={styles.contactInfo}>
                        {vendor.phone}
                      </Text>
                    </View>
                  </View>
                  <Chip 
                    mode="outlined"
                    style={[
                      styles.statusChip,
                      { 
                        borderColor: vendor.status === 'active' 
                          ? theme.colors.primary 
                          : theme.colors.error 
                      }
                    ]}
                  >
                    {vendor.status.toUpperCase()}
                  </Chip>
                </View>

                <View style={styles.detailsContainer}>
                  <Text variant="bodyMedium" style={styles.address}>
                    {vendor.address}
                  </Text>
                  <Text variant="bodyMedium" style={styles.gst}>
                    GST: {vendor.gstNumber}
                  </Text>
                </View>

                <DataTable style={styles.billsTable}>
                  <DataTable.Header>
                    <DataTable.Title>Bills Summary</DataTable.Title>
                    <DataTable.Title numeric>Count</DataTable.Title>
                    <DataTable.Title numeric>Amount</DataTable.Title>
                  </DataTable.Header>

                  <DataTable.Row>
                    <DataTable.Cell>Total Bills</DataTable.Cell>
                    <DataTable.Cell numeric>{vendorBills.length}</DataTable.Cell>
                    <DataTable.Cell numeric>₹{totalAmount.toLocaleString()}</DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>Pending</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {vendorBills.filter(b => b.status === 'pending').length}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      ₹{vendorBills
                        .filter(b => b.status === 'pending')
                        .reduce((sum, b) => sum + b.totalAmount, 0)
                        .toLocaleString()}
                    </DataTable.Cell>
                  </DataTable.Row>
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
            Add New Vendor
          </Text>
          <TextInput
            label="Company Name"
            value={newVendorName}
            onChangeText={setNewVendorName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={newVendorEmail}
            onChangeText={setNewVendorEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            label="Phone"
            value={newVendorPhone}
            onChangeText={setNewVendorPhone}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            label="Address"
            value={newVendorAddress}
            onChangeText={setNewVendorAddress}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
          />
          <TextInput
            label="GST Number"
            value={newVendorGst}
            onChangeText={setNewVendorGst}
            mode="outlined"
            style={styles.input}
          />
          <View style={styles.modalActions}>
            <Button 
              mode="contained"
              onPress={handleAddVendor}
              style={styles.modalButton}
            >
              Add Vendor
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
  vendorCard: {
    margin: 10,
    marginBottom: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  vendorInfo: {
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
  detailsContainer: {
    marginTop: 15,
  },
  address: {
    opacity: 0.7,
  },
  gst: {
    marginTop: 5,
    opacity: 0.7,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  billsTable: {
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