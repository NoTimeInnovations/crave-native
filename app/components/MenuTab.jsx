// components/MenuTab.jsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useAdminStore } from '../store/store';

const MenuTab = () => {
  const { menuItems } = useAdminStore();

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Menu Items</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16, backgroundColor: 'white', marginBottom: 8, borderRadius: 8, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937' }}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MenuTab;