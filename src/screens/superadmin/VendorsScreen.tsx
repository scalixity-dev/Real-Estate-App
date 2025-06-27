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
  DataTable,
  Divider,
  IconButton,
  SegmentedButtons,
  HelperText,
  Searchbar
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

// Predefined vendor list
const PREDEFINED_VENDORS = [
  { id: 'tata', name: 'Tata Steel', category: 'Steel' },
  { id: 'ultratech', name: 'UltraTech Cement', category: 'Cement' },
  { id: 'acc', name: 'ACC Cement', category: 'Cement' },
  { id: 'ambuja', name: 'Ambuja Cement', category: 'Cement' },
  { id: 'jsw', name: 'JSW Steel', category: 'Steel' },
  { id: 'sail', name: 'SAIL', category: 'Steel' },
  { id: 'birla', name: 'Birla Corp', category: 'Cement' },
  { id: 'ramco', name: 'Ramco Cements', category: 'Cement' },
];

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  gstNumber: string;
  category: string;
  assignedSites: string[];
  totalBills: number;
  totalAmount: number;
}

export default function VendorsScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [vendorData, setVendorData] = useState({
    email: '',
    phone: '',
    address: '',
    gstNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // TODO: Add vendors to Redux state
  const vendors: Vendor[] = [];
  const sites = useSelector((state: RootState) => state.sites.sites);
  const bills = useSelector((state: RootState) => state.materials.bills);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedVendor) newErrors.vendor = 'Please select a vendor';
    if (!vendorData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(vendorData.email)) newErrors.email = 'Invalid email format';
    if (!vendorData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d-]{10,}$/.test(vendorData.phone)) newErrors.phone = 'Invalid phone format';
    if (!vendorData.gstNumber) newErrors.gstNumber = 'GST number is required';
    if (!vendorData.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVendor = () => {
    if (!validateForm()) return;

    const selectedVendorData = PREDEFINED_VENDORS.find(v => v.id === selectedVendor);
    if (!selectedVendorData) return;

    const newVendor: Vendor = {
      id: selectedVendorData.id,
      name: selectedVendorData.name,
      category: selectedVendorData.category,
      email: vendorData.email,
      phone: vendorData.phone,
      address: vendorData.address,
      gstNumber: vendorData.gstNumber,
      status: 'active',
      assignedSites: [],
      totalBills: 0,
      totalAmount: 0,
    };

    // TODO: Dispatch action to add vendor
    // dispatch(addVendor(newVendor));

    setIsModalVisible(false);
    setSelectedVendor(null);
    setVendorData({
      email: '',
      phone: '',
      address: '',
      gstNumber: '',
    });
    setErrors({});
  };

  const filteredVendors = PREDEFINED_VENDORS.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'all') return matchesSearch;
    return matchesSearch && vendor.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Vendors Management</Text>
        <Button
          mode="contained"
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
        >
          Add Vendor
        </Button>
      </View>

      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Search vendors..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <SegmentedButtons
          value={filter}
          onValueChange={setFilter}
          buttons={[
            { value: 'all', label: 'All' },
            { value: 'cement', label: 'Cement' },
            { value: 'steel', label: 'Steel' },
          ]}
          style={styles.filterButtons}
        />
      </View>

      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Vendor Name</DataTable.Title>
            <DataTable.Title>Category</DataTable.Title>
            <DataTable.Title numeric>Status</DataTable.Title>
            <DataTable.Title numeric>Actions</DataTable.Title>
          </DataTable.Header>

          {filteredVendors.map((vendor) => {
            const isActive = vendors.some(v => v.id === vendor.id);
            return (
              <DataTable.Row key={vendor.id}>
                <DataTable.Cell>{vendor.name}</DataTable.Cell>
                <DataTable.Cell>{vendor.category}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Chip
                    mode="outlined"
                    textStyle={{ fontSize: 12 }}
                    style={[
                      styles.statusChip,
                      { borderColor: isActive ? theme.colors.primary : theme.colors.error },
                    ]}
                  >
                    {isActive ? 'Active' : 'Inactive'}
                  </Chip>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <IconButton
                    icon={isActive ? 'eye' : 'plus'}
                    size={20}
                    onPress={() => {
                      if (!isActive) setIsModalVisible(true);
                      setSelectedVendor(vendor.id);
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => {
            setIsModalVisible(false);
            setSelectedVendor(null);
            setVendorData({
              email: '',
              phone: '',
              address: '',
              gstNumber: '',
            });
            setErrors({});
          }}
          contentContainerStyle={styles.modalContent}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Add New Vendor
          </Text>

          <Text variant="labelMedium">Selected Vendor</Text>
          <View style={styles.vendorSelection}>
            {PREDEFINED_VENDORS.map((vendor) => (
              <Chip
                key={vendor.id}
                mode="outlined"
                selected={selectedVendor === vendor.id}
                onPress={() => setSelectedVendor(vendor.id)}
                style={styles.vendorChip}
              >
                {vendor.name}
              </Chip>
            ))}
          </View>
          {errors.vendor && (
            <HelperText type="error" visible={!!errors.vendor}>
              {errors.vendor}
            </HelperText>
          )}

          <TextInput
            label="Email"
            value={vendorData.email}
            onChangeText={(text) => setVendorData({ ...vendorData, email: text })}
            style={styles.input}
            error={!!errors.email}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Phone"
            value={vendorData.phone}
            onChangeText={(text) => setVendorData({ ...vendorData, phone: text })}
            style={styles.input}
            error={!!errors.phone}
          />
          <HelperText type="error" visible={!!errors.phone}>
            {errors.phone}
          </HelperText>

          <TextInput
            label="GST Number"
            value={vendorData.gstNumber}
            onChangeText={(text) => setVendorData({ ...vendorData, gstNumber: text })}
            style={styles.input}
            error={!!errors.gstNumber}
          />
          <HelperText type="error" visible={!!errors.gstNumber}>
            {errors.gstNumber}
          </HelperText>

          <TextInput
            label="Address"
            value={vendorData.address}
            onChangeText={(text) => setVendorData({ ...vendorData, address: text })}
            style={styles.input}
            error={!!errors.address}
            multiline
          />
          <HelperText type="error" visible={!!errors.address}>
            {errors.address}
          </HelperText>

          <Button mode="contained" onPress={handleAddVendor} style={styles.submitButton}>
            Add Vendor
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    marginLeft: 16,
  },
  filterContainer: {
    marginBottom: 16,
    gap: 8,
  },
  searchBar: {
    marginBottom: 8,
  },
  filterButtons: {
    marginBottom: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 4,
  },
  submitButton: {
    marginTop: 16,
  },
  vendorSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  vendorChip: {
    marginBottom: 4,
  },
  statusChip: {
    height: 24,
  },
}); 