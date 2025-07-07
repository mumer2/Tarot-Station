import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RechargeScreen() {
  const [balance, setBalance] = useState(0);

  // Load balance from AsyncStorage
  const loadBalance = async () => {
    try {
      const value = await AsyncStorage.getItem('@wallet_balance');
      if (value) setBalance(parseInt(value));
    } catch (e) {
      console.error('Error loading balance:', e);
    }
  };

  useEffect(() => {
    loadBalance();
  }, []);

  const addBalance = async (amount) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    await AsyncStorage.setItem('@wallet_balance', newBalance.toString());
    Alert.alert('✅ Recharge Successful', `Added ${amount} RMB`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Wallet</Text>
      <Text style={styles.balanceText}>Current Balance: {balance} RMB</Text>

      <TouchableOpacity
        style={styles.rechargeButton}
        onPress={() => addBalance(5)}
      >
        <Text style={styles.rechargeText}>Recharge 5 RMB</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rechargeButton}
        onPress={() => addBalance(10)}
      >
        <Text style={styles.rechargeText}>Recharge 10 RMB</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rechargeButton}
        onPress={() => addBalance(20)}
      >
        <Text style={styles.rechargeText}>Recharge 20 RMB</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#f8e1c1',
    marginBottom: 20,
  },
  balanceText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 30,
  },
  rechargeButton: {
    backgroundColor: '#f8e1c1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
  },
  rechargeText: {
    fontSize: 16,
    color: '#2c2c4e',
    fontWeight: 'bold',
  },
});
