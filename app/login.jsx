import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF7ED', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ width: '100%', maxWidth: 400, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Icon name="account-outline" color="#FB923C" size={48} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginTop: 10 }}>Welcome to Cravings</Text>
          <Text style={{ color: '#6B7280', marginTop: 5 }}>{isSignUp ? 'Create an account' : 'Sign in to your account'}</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <TextInput
            placeholder="Email"
            style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#F9FAFB' }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: isSignUp ? 10 : 0, backgroundColor: '#F9FAFB' }}
          />
          {isSignUp && (
            <TextInput
              placeholder="Re-enter Password"
              secureTextEntry
              style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, backgroundColor: '#F9FAFB' }}
            />
          )}
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#FB923C', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsSignUp(!isSignUp)}
          style={{ alignItems: 'center' }}
        >
          <Text style={{ color: '#FB923C', fontWeight: 'bold' }}>
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
