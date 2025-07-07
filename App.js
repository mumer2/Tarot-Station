import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './utils/i18n'; // 👈 import your i18n setup
import { setAppLanguage } from './utils/i18n';
import { LanguageProvider } from './context/LanguageContext'; // ✅ import
import { ThemeProvider } from './context/ThemeContext';
// Screens
import HomeScreen from './screens/HomeScreen';
import HoroscopeScreen from './screens/HoroscopeScreen';
import ChatScreen from './screens/ChatScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import MyBotScreen from './screens/MyBotScreen';
import RechargeScreen from './screens/RechargeScreen';
import HistoryScreen from './screens/HistoryScreen';
import SessionView from './screens/SessionView';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsScreen from './screens/TermsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem('@lang');
        if (lang) {
          i18n.locale = lang;
        }
      } catch (e) {
        console.warn('Failed to load language:', e);
      } finally {
        setIsReady(true); // ✅ Now render screens
      }
    };

    initLanguage();
  }, []);

  if (!isReady) return null; // Show splash here if desired

  return (
    <ThemeProvider>
     <LanguageProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tarot Station' }} />
        <Stack.Screen name="Horoscope" component={HoroscopeScreen} options={{ title: 'Horoscope' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Tarot Chat' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen name="MyBot" component={MyBotScreen} options={{ title: 'My Bot' }} />
        <Stack.Screen name="Recharge" component={RechargeScreen} options={{ title: 'Recharge' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Chat History' }} />
        <Stack.Screen name="SessionView" component={SessionView} options={{ title: 'Chat History View' }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Terms of Service' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </LanguageProvider>
    </ThemeProvider>
  );
}
