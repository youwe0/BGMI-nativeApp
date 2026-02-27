import React, { useState, useRef } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import type { ChatMessage, ChatType } from '@/types';

// Mock messages — real-time WebSocket integration point in future
const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', senderId: 'p1', senderName: 'SnipeKing99', text: 'Ready for the match?', timestamp: '8:00 PM', isMine: false },
  { id: '2', senderId: 'me', senderName: 'Too Too Player', text: 'Yes! Let\'s go 🔥', timestamp: '8:01 PM', isMine: true },
  { id: '3', senderId: 'p2', senderName: 'BlazeFire', text: 'Room opens in 5 mins', timestamp: '8:02 PM', isMine: false },
  { id: '4', senderId: 'me', senderName: 'Too Too Player', text: 'GG to all ✌️', timestamp: '8:03 PM', isMine: true },
  { id: '5', senderId: 'p1', senderName: 'SnipeKing99', text: 'No camping allowed! 😤', timestamp: '8:04 PM', isMine: false },
];

const CHAT_TITLES: Record<string, string> = {
  match: 'Match Chat',
  lobby: 'Global Lobby',
  dm: 'Direct Message',
};

export default function ChatScreen() {
  const { colors } = useTheme();
  const { type } = useLocalSearchParams<{ type: ChatType }>();
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList>(null);

  const chatTitle = CHAT_TITLES[type ?? 'match'] ?? 'Chat';

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'Too Too Player',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[styles.msgRow, item.isMine && styles.msgRowMine]}>
      {!item.isMine && (
        <View style={[styles.msgAvatar, { backgroundColor: colors.secondary + '30' }]}>
          <Text style={[styles.msgAvatarText, { color: colors.secondary }]}>
            {item.senderName.charAt(0)}
          </Text>
        </View>
      )}
      <View style={styles.msgContent}>
        {!item.isMine && (
          <Text style={[styles.msgSender, { color: colors.primary }]}>{item.senderName}</Text>
        )}
        <View
          style={[
            styles.bubble,
            item.isMine
              ? { backgroundColor: colors.primary + '25', borderColor: colors.primary + '40' }
              : { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Text style={[styles.bubbleText, { color: colors.text }]}>{item.text}</Text>
        </View>
        <Text style={[styles.msgTime, { color: colors.textSecondary }]}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{chatTitle}</Text>
        <Text style={[styles.onlineCount, { color: colors.success }]}>● 12 online</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        {/* Messages */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          renderItem={renderMessage}
          onContentSizeChange={() => listRef.current?.scrollToEnd()}
        />

        {/* Input bar */}
        <View style={[styles.inputBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            multiline
            maxLength={300}
          />
          <TouchableOpacity
            style={[
              styles.sendBtn,
              { backgroundColor: inputText.trim() ? colors.primary : colors.border },
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1,
  },
  backText: { fontSize: 15, fontWeight: '600' },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  onlineCount: { fontSize: 12, fontWeight: '600' },
  messageList: { padding: 16, gap: 12 },
  msgRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  msgRowMine: { flexDirection: 'row-reverse' },
  msgAvatar: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  msgAvatarText: { fontSize: 13, fontWeight: '800' },
  msgContent: { maxWidth: '72%' },
  msgSender: { fontSize: 11, fontWeight: '700', marginBottom: 4, marginLeft: 4 },
  bubble: { borderRadius: 16, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  msgTime: { fontSize: 10, marginTop: 4, marginHorizontal: 4 },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    padding: 12, borderTopWidth: 1,
  },
  input: {
    flex: 1, borderRadius: 20, borderWidth: 1,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, maxHeight: 100,
  },
  sendBtn: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  sendIcon: { fontSize: 16, color: '#0B0F14' },
});
