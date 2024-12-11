import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAdminStore } from '../store/store';

const AdminDashboard = () => {
  const {
    menuItems,
    offers,
    fetchMenu,
    fetchOffers,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addOffer,
    deleteOffer,
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState('menu');
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [isOfferModalVisible, setOfferModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [offerData, setOfferData] = useState({
    menuItemId: '',
    newPrice: '',
    validUntil: '',
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchMenu();
    fetchOffers();
  }, [fetchMenu, fetchOffers]);

  const handleAddOrEditMenu = () => {
    if (editingItem) {
      updateMenuItem(editingItem.id, formData);
    } else {
      addMenuItem({ ...formData, price: parseFloat(formData.price) });
    }
    setMenuModalVisible(false);
    setFormData({ name: '', price: '', description: '', image: '' });
    setEditingItem(null);
  };

  const handleEditMenu = (item) => {
    setEditingItem(item);
    setFormData(item);
    setMenuModalVisible(true);
  };

  const handleDeleteMenu = (id) => {
    deleteMenuItem(id);
  };

  const handleAddOffer = () => {
    addOffer({
      menuItemId: offerData.menuItemId,
      newPrice: parseFloat(offerData.newPrice),
      validUntil: new Date(new Date().getTime() + 3600000),
      itemsAvailable: 10,
    });
    setOfferModalVisible(false);
    setOfferData({ menuItemId: '', newPrice: '', validUntil: '' });
  };

  const renderMenuTab = () => (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#FB923C',
          padding: 10,
          borderRadius: 8,
          marginBottom: 16,
          alignItems: 'center',
        }}
        onPress={() => setMenuModalVisible(true)}
      >
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Add Menu Item</Text>
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              backgroundColor: 'white',
              marginBottom: 8,
              borderRadius: 8,
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937' }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Price: ₹{item.price}</Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>{item.description}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity
                style={{ marginRight: 8, backgroundColor: '#FB923C', padding: 6, borderRadius: 4 }}
                onPress={() => handleEditMenu(item)}
              >
                <Text style={{ color: '#FFF' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: '#EF4444', padding: 6, borderRadius: 4 }}
                onPress={() => handleDeleteMenu(item.id)}
              >
                <Text style={{ color: '#FFF' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  const renderOffersTab = () => (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#FB923C',
          padding: 10,
          borderRadius: 8,
          marginBottom: 16,
          alignItems: 'center',
        }}
        onPress={() => setOfferModalVisible(true)}
      >
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Add Offer</Text>
      </TouchableOpacity>

      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              backgroundColor: 'white',
              marginBottom: 8,
              borderRadius: 8,
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937' }}>{item.dishName}</Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>New Price: ₹{item.newPrice}</Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Items Available: {item.itemsAvailable}</Text>
            <TouchableOpacity
              style={{ backgroundColor: '#EF4444', padding: 6, borderRadius: 4, marginTop: 8 }}
              onPress={() => deleteOffer(item.id)}
            >
              <Text style={{ color: '#FFF' }}>Delete Offer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF7ED', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Admin Dashboard</Text>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => setActiveTab('menu')}
          style={{
            flex: 1,
            paddingVertical: 12,
            backgroundColor: activeTab === 'menu' ? '#FB923C' : '#E5E7EB',
            alignItems: 'center',
            borderRadius: 8,
            marginRight: 4,
          }}
        >
          <Text style={{ color: activeTab === 'menu' ? 'white' : '#1F2937', fontWeight: 'bold' }}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('offers')}
          style={{
            flex: 1,
            paddingVertical: 12,
            backgroundColor: activeTab === 'offers' ? '#FB923C' : '#E5E7EB',
            alignItems: 'center',
            borderRadius: 8,
            marginLeft: 4,
          }}
        >
          <Text style={{ color: activeTab === 'offers' ? 'white' : '#1F2937', fontWeight: 'bold' }}>Offers</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'menu' ? renderMenuTab() : renderOffersTab()}

      <Modal visible={isMenuModalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#FFF' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</Text>
          <TextInput
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: 8 }}
          />
          <TextInput
            placeholder="Price"
            value={formData.price}
            keyboardType="numeric"
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: 8 }}
          />
          <TextInput
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: 8 }}
          />
          <TextInput
            placeholder="Image URL"
            value={formData.image}
            onChangeText={(text) => setFormData({ ...formData, image: text })}
            style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: 16 }}
          />
          <Button title={editingItem ? 'Save Changes' : 'Add Item'} onPress={handleAddOrEditMenu} />
          <Button title="Cancel" color="red" onPress={() => setMenuModalVisible(false)} />
        </View>
      </Modal>

      <Modal visible={isOfferModalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#FFF' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Add Offer</Text>
          <Picker
            selectedValue={offerData.menuItemId}
            onValueChange={(itemValue) => setOfferData({ ...offerData, menuItemId: itemValue })}
            style={{ height: 50, width: '100%', marginBottom: 16 }}
          >
            <Picker.Item label="Select Menu Item" value="" />
            {menuItems.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
          <TextInput
            placeholder="New Price"
            value={offerData.newPrice}
            keyboardType="numeric"
            onChangeText={(text) => setOfferData({ ...offerData, newPrice: text })}
            style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: 8 }}
          />
          <Button title="Add Offer" onPress={handleAddOffer} />
          <Button title="Cancel" color="red" onPress={() => setOfferModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default AdminDashboard;
