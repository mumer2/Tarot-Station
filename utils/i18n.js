import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n();

i18n.translations = {
 en: {
    settings: 'Settings',
    language: 'Language',
    darkTheme: 'Dark Theme',
    resetBot: 'Reset Tarot Bot Personality',
    clearChat: 'Clear Chat History',
    resetWallet: 'Reset Wallet Balance',
    themeChanged: 'Theme changed',
    confirmDeleteHistory: 'Delete all chat history?',
    cancel: 'Cancel',
    delete: 'Delete',
    chatDeleted: 'All chat sessions cleared.',
    walletReset: 'Wallet set to 0 RMB',
    botReset: 'Bot reset to default',
  },
   zh: {
    settings: '设置',
    language: '语言',
    darkTheme: '深色主题',
    resetBot: '重置塔罗机器人个性',
    clearChat: '清除聊天记录',
    resetWallet: '重置钱包余额',
    themeChanged: '主题已更改',
    confirmDeleteHistory: '确定要删除所有聊天记录吗？',
    cancel: '取消',
    delete: '删除',
    chatDeleted: '所有聊天会话已删除。',
    walletReset: '钱包已重置为0元',
    botReset: '机器人已重置为默认',
  },
};

i18n.fallbacks = true;
i18n.locale = Localization.locale || 'en';

export default i18n;
