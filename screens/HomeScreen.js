import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
    <ScrollView>
      <Text style={styles.header}>🔮 Tarot Station</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/avatar.png')} // Make sure avatar.png exists in assets
          style={styles.avatar}
        />
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Horoscope')}>
          <MaterialCommunityIcons name="zodiac-aquarius" size={32} color="#fff" />
          <Text style={styles.cardText}>Horoscope</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubble-ellipses-outline" size={32} color="#fff" />
          <Text style={styles.cardText}>Tarot Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyBot')}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
          <Text style={styles.cardText}>My Bot</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Recharge')}>
          <Ionicons name="wallet-outline" size={32} color="#fff" />
          <Text style={styles.cardText}>Recharge</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('History')}>
          <FontAwesome5 name="history" size={28} color="#fff" />
          <Text style={styles.cardText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 16,
    paddingTop: 0,
  },
  header: {
    fontSize: 26,
    color: '#f8e1c1',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#A26769',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#2D2B4E',
    width: '48%',
    marginBottom: 20,
    paddingVertical: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#4e446e',
  },
  cardText: {
    marginTop: 10,
    color: '#f8e1c1',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
