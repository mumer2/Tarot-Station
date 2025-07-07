import React, { useEffect, useState,useContext  } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';
import { LanguageContext } from '../context/LanguageContext';

export default function SettingsScreen({ navigation }) {
  const [selectedLang, setSelectedLang] = useState(i18n.locale.startsWith('zh') ? 'zh' : 'en');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const lang = await AsyncStorage.getItem('@lang');
      if (lang) {
        i18n.locale = lang;
        setSelectedLang(lang);
      }

      const theme = await AsyncStorage.getItem('@theme');
      if (theme === 'light') {
        setIsDarkMode(false);
      }
    };
    loadSettings();
  }, []);

  const changeLanguage = async (lang) => {
    try {
      i18n.locale = lang;
      await AsyncStorage.setItem('@lang', lang);
      setSelectedLang(lang);
      Alert.alert('✅', i18n.t('language') + ' updated. Restart app to apply.');
    } catch (e) {
      Alert.alert('❌', 'Language change failed.');
    }
  };

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    await AsyncStorage.setItem('@theme', newTheme);
    Alert.alert('🎨 Theme changed', `Now using ${newTheme} mode.`);
  };

  const clearChatHistory = async () => {
    Alert.alert('⚠️ Confirm', 'Delete all chat history?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('@chat_sessions');
          Alert.alert('✅ Deleted', 'All chat sessions cleared.');
        },
      },
    ]);
  };

  const resetWallet = async () => {
    await AsyncStorage.setItem('@wallet_balance', '0');
    Alert.alert('✅ Wallet Reset', 'Balance set to 0 RMB.');
  };

  const resetBot = async () => {
    await AsyncStorage.removeItem('@tarot_bot');
    Alert.alert('🧙‍♀️', 'Bot profile reset to default.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{i18n.t('settings')}</Text>

      {/* Language Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🌐 {i18n.t('language')}</Text>
        <View style={styles.langRow}>
          <TouchableOpacity
            style={[styles.langButton, selectedLang === 'en' && styles.selectedButton]}
            onPress={() => changeLanguage('en')}
          >
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langButton, selectedLang === 'zh' && styles.selectedButton]}
            onPress={() => changeLanguage('zh')}
          >
            <Text style={styles.buttonText}>中文</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Theme Section */}
      <View style={styles.card}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>🌓 {i18n.t('darkTheme')}</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>

      {/* Actions */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.itemButton} onPress={resetBot}>
          <Text style={styles.itemText}>♻️ {i18n.t('resetBot')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemButton} onPress={clearChatHistory}>
          <Text style={styles.itemText}>🗑️ {i18n.t('clearChat')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemButton} onPress={resetWallet}>
          <Text style={styles.itemText}>💰 {i18n.t('resetWallet')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    color: '#f8e1c1',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 25,
  },
  sectionTitle: {
    color: '#f8e1c1',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#2d2b4e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  langButton: {
    backgroundColor: '#3b3857',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#A26769',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
  },
  itemButton: {
    paddingVertical: 14,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  itemText: {
    color: '#f8e1c1',
    fontSize: 15,
  },
});
