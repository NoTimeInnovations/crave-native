import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const offers = [
  {
    id: '1',
    dishName: 'Grilled Chicken',
    description: 'Juicy grilled chicken with herbs and spices.',
    hotelName: 'Food Paradise',
    originalPrice: 500,
    newPrice: 300,
    validUntil: '2023-12-31',
    area: 'Downtown',
    itemsAvailable: 10,
    dishImage: 'https://via.placeholder.com/150',
    category: 'hotel',
  },
  {
    id: '3',
    dishName: 'Grilled barbeque',
    description: 'Juicy grilled barbeque',
    hotelName: 'Food Paradise',
    originalPrice: 600,
    newPrice: 400,
    validUntil: '2023-12-31',
    area: 'Downtown',
    itemsAvailable: 14,
    dishImage: 'https://via.placeholder.com/150',
    category: 'hotel',
  },
  {
    id: '2',
    dishName: 'Veggie Delight',
    description: 'Fresh and healthy vegetable platter.',
    hotelName: 'Green Bites',
    originalPrice: 400,
    newPrice: 250,
    validUntil: '2023-12-31',
    area: 'Uptown',
    itemsAvailable: 5,
    dishImage: 'https://via.placeholder.com/150',
    category: 'supermarket',
  },
];

const OfferCard = ({ offer }) => {
  const discount = Math.round(((offer.originalPrice - offer.newPrice) / offer.originalPrice) * 100);

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>{offer.dishName}</Text>
        <Text style={{ fontSize: 14, color: '#6B7280', marginVertical: 4 }}>{offer.description}</Text>
        <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>{offer.hotelName}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ textDecorationLine: 'line-through', color: '#9CA3AF' }}>₹{offer.originalPrice}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FB923C' }}>₹{offer.newPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
          <Icon name="clock-outline" size={16} color="#6B7280" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 12, color: '#6B7280' }}>Valid until: {offer.validUntil}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
          <Icon name="map-marker-outline" size={16} color="#6B7280" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 12, color: '#6B7280' }}>{offer.area}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#FB923C',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 4,
            marginTop: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Claim Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OffersPage = () => {
  const [activeTab, setActiveTab] = useState('foodie');

  const filteredOffers = offers.filter((offer) =>
    activeTab === 'foodie' ? offer.category === 'hotel' : offer.category === 'supermarket'
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF7ED', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1F2937' }}>
        Today's Special Offers
      </Text>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => setActiveTab('foodie')}
          style={{
            flex: 1,
            paddingVertical: 12,
            backgroundColor: activeTab === 'foodie' ? '#FB923C' : '#E5E7EB',
            alignItems: 'center',
            borderRadius: 8,
            marginRight: 4,
          }}
        >
          <Text style={{ color: activeTab === 'foodie' ? 'white' : '#1F2937', fontWeight: 'bold' }}>
            Foodie Offers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('cravemart')}
          style={{
            flex: 1,
            paddingVertical: 12,
            backgroundColor: activeTab === 'cravemart' ? '#FB923C' : '#E5E7EB',
            alignItems: 'center',
            borderRadius: 8,
            marginLeft: 4,
          }}
        >
          <Text style={{ color: activeTab === 'cravemart' ? 'white' : '#1F2937', fontWeight: 'bold' }}>
            Crave Mart
          </Text>
        </TouchableOpacity>
      </View>

      {/* Offer List */}
      <FlatList
        data={filteredOffers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OfferCard offer={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OffersPage;
