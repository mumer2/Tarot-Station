import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function RechargeScreen() {
  const [balance, setBalance] = useState(0);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const navigation = useNavigation();

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const value = await AsyncStorage.getItem('@wallet_balance');
        setBalance(value ? parseInt(value) : 0);
      } catch (e) {
        console.error('Error loading balance:', e);
      }
    };

    loadBalance();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles(isDark).container}>
      <Ionicons
        name="wallet-outline"
        size={64}
        color={isDark ? '#f8e1c1' : '#2c2c4e'}
        style={styles(isDark).icon}
      />

      <Text style={styles(isDark).title}>💰 Wallet Recharge</Text>
      <Text style={styles(isDark).label}>Current Balance</Text>
      <Text style={styles(isDark).balance}>{balance} RMB</Text>

      <View style={styles(isDark).buttonsWrapper}>
        {[5, 10, 20, 50].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={styles(isDark).button}
            onPress={() => navigation.navigate('Alipay', { amount })}
          >
            <Text style={styles(isDark).buttonText}>Recharge {amount} RMB</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles(isDark).note}>
        💡 1 RMB = 1 minute of chat time with the Tarot AI.
      </Text>
    </ScrollView>
  );
}

const styles = (isDark) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      alignItems: 'center',
      padding: 24,
    },
    icon: {
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#f8e1c1' : '#2c2c4e',
      marginBottom: 8,
    },
    label: {
      fontSize: 16,
      color: isDark ? '#ccc' : '#666',
      marginBottom: 4,
    },
    balance: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#f8e1c1' : '#2c2c4e',
      marginBottom: 24,
    },
    buttonsWrapper: {
      width: '100%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#f8e1c1',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 25,
      marginVertical: 10,
      width: '80%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 6,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2c2c4e',
    },
    note: {
      marginTop: 30,
      fontSize: 14,
      color: isDark ? '#aaa' : '#444',
      textAlign: 'center',
      paddingHorizontal: 10,
    },
  });
