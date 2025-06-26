import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Card,
  SegmentedButtons,
  List,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MaterialRequest, Vendor } from '../../types';

export default function SubmitPurchaseScreen() {
  const theme = useTheme();
  const [selectedRequest, setSelectedRequest] = useState<MaterialRequest | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [billImage, setBillImage] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: string }>({});
  const [prices, setPrices] = useState<{ [key: string]: string }>({});

  const requests = useSelector((state: RootState) => state.materials.requests);
  const vendors = useSelector((state: RootState) => state.vendors?.vendors || []);

  const handleQuantityChange = (materialId: string, value: string) => {
    setQuantities({ ...quantities, [materialId]: value });
  };

  const handlePriceChange = (materialId: string, value: string) => {
    setPrices({ ...prices, [materialId]: value });
  };

  const handleImageUpload = () => {
    // TODO: Implement image upload functionality
    setBillImage('https://example.com/mock-bill-image.jpg');
  };

  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [materialId, quantity]) => {
      const price = parseFloat(prices[materialId] || '0');
      return total + price * parseFloat(quantity || '0');
    }, 0);
  };

  const handleSubmit = () => {
    // TODO: Implement submit functionality
    console.log('Submitting purchase...');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Submit Purchase Details
          </Text>

          <View style={styles.section}>
            <Text variant="titleMedium">Select Material Request</Text>
            <SegmentedButtons
              value={selectedRequest?.id || ''}
              onValueChange={(value) =>
                setSelectedRequest(
                  requests.find((req) => req.id === value) || null
                )
              }
              buttons={requests
                .filter((req) => req.status === 'approved')
                .map((req) => ({
                  value: req.id,
                  label: `Request #${req.id}`,
                }))}
            />
          </View>

          {selectedRequest && (
            <>
              <View style={styles.section}>
                <Text variant="titleMedium">Select Vendor</Text>
                <SegmentedButtons
                  value={selectedVendor?.id || ''}
                  onValueChange={(value) =>
                    setSelectedVendor(
                      vendors.find((vendor) => vendor.id === value) || null
                    )
                  }
                  buttons={vendors.map((vendor) => ({
                    value: vendor.id,
                    label: vendor.name,
                  }))}
                />
              </View>

              <View style={styles.section}>
                <Text variant="titleMedium">Material Details</Text>
                {selectedRequest.materials.map((material) => (
                  <List.Item
                    key={material.materialId}
                    title={`Material ID: ${material.materialId}`}
                    description={`Requested Quantity: ${material.quantity}`}
                    left={(props) => <List.Icon {...props} icon="package-variant" />}
                    right={() => (
                      <View style={styles.inputContainer}>
                        <TextInput
                          label="Quantity"
                          value={quantities[material.materialId] || ''}
                          onChangeText={(value) =>
                            handleQuantityChange(material.materialId, value)
                          }
                          keyboardType="numeric"
                          style={styles.input}
                          mode="outlined"
                        />
                        <TextInput
                          label="Unit Price"
                          value={prices[material.materialId] || ''}
                          onChangeText={(value) =>
                            handlePriceChange(material.materialId, value)
                          }
                          keyboardType="numeric"
                          style={styles.input}
                          mode="outlined"
                        />
                      </View>
                    )}
                  />
                ))}
              </View>

              <View style={styles.section}>
                <Text variant="titleMedium">Upload Bill Image</Text>
                <Button
                  mode="outlined"
                  onPress={handleImageUpload}
                  style={styles.uploadButton}
                >
                  Select Image
                </Button>
                {billImage && (
                  <Image
                    source={{ uri: billImage }}
                    style={styles.billImage}
                    resizeMode="cover"
                  />
                )}
              </View>

              <View style={styles.section}>
                <Text variant="titleMedium">Total Amount</Text>
                <Text variant="headlineMedium" style={styles.total}>
                  ₹{calculateTotal().toFixed(2)}
                </Text>
              </View>

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
              >
                Submit Purchase
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  uploadButton: {
    marginTop: 8,
  },
  billImage: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 8,
  },
  total: {
    marginTop: 8,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
}); 