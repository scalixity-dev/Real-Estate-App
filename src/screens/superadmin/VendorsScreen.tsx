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
      <Text variant="headlineMedium">Vendors Management</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
}); 