import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const { colors, isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={
          isDark
            ? ['rgba(0,229,255,0.1)', 'transparent', 'rgba(124,77,255,0.12)']
            : ['rgba(26,115,232,0.1)', 'transparent', 'rgba(255,112,67,0.12)']
        }
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

            {/* ── Branding ── */}
            <View style={styles.brand}>
              <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
                <Text style={styles.logoText}>TT</Text>
              </View>
              <Text style={[styles.appName, { color: colors.text }]}>Too Too</Text>
              <Text style={[styles.tagline, { color: isDark ? colors.primary : colors.secondary }]}>
                Host. Join. Dominate.
              </Text>
            </View>

            {/* ── Login Card ── */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Welcome Back</Text>
              <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
                Login to your Too Too account
              </Text>

              <View style={styles.field}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.field}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.forgotRow}>
                <Text style={[styles.forgotText, { color: colors.primary }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <Pressable
                style={({ pressed }) => [
                  styles.loginBtn,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
                ]}
                onPress={() => router.replace('/(drawer)/home')}>
                <Text style={styles.loginBtnText}>Login</Text>
              </Pressable>
            </View>

            {/* ── Sign Up Link ── */}
            <View style={styles.bottomRow}>
              <Text style={[styles.bottomText, { color: colors.textSecondary }]}>
                Don't have an account?{'  '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={[styles.bottomLink, { color: colors.primary }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 },

  brand: { alignItems: 'center', marginBottom: 40 },
  logoCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#00E5FF',
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 7,
  },
  logoText: { fontSize: 30, fontWeight: '900', color: '#0B0F14' },
  appName: { fontSize: 48, fontWeight: '900', letterSpacing: 2, marginBottom: 6 },
  tagline: { fontSize: 15, fontWeight: '600', letterSpacing: 0.5 },

  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    marginBottom: 24,
  },
  cardTitle: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  cardSub: { fontSize: 14, marginBottom: 24, lineHeight: 20 },

  field: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },

  forgotRow: { alignItems: 'flex-end', marginBottom: 22, marginTop: -4 },
  forgotText: { fontSize: 13, fontWeight: '600' },

  loginBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  loginBtnText: { color: '#0B0F14', fontSize: 16, fontWeight: '800' },

  bottomRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  bottomText: { fontSize: 14 },
  bottomLink: { fontSize: 14, fontWeight: '700' },
});
