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

export default function SignUpScreen() {
  const { colors, isDark } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={
          isDark
            ? ['rgba(124,77,255,0.12)', 'transparent', 'rgba(0,229,255,0.1)']
            : ['rgba(255,112,67,0.12)', 'transparent', 'rgba(26,115,232,0.1)']
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

            {/* ── Back button ── */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
            </TouchableOpacity>

            {/* ── Branding ── */}
            <View style={styles.brand}>
              <View style={[styles.logoCircle, { backgroundColor: colors.secondary }]}>
                <Text style={styles.logoText}>YW</Text>
              </View>
              <Text style={[styles.appName, { color: colors.text }]}>YouWe</Text>
              <Text style={[styles.tagline, { color: colors.secondary }]}>
                Join the Arena
              </Text>
            </View>

            {/* ── Sign Up Card ── */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Create Account</Text>
              <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
                Start your tournament journey today
              </Text>

              <View style={styles.field}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                  Username
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="e.g. ProGamer99"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="none"
                />
              </View>

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
                  placeholder="Create a strong password"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry
                />
              </View>

              <View style={styles.field}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                  Confirm Password
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Re-enter your password"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry
                />
              </View>

              {/* Create Account — goes to Login */}
              <Pressable
                style={({ pressed }) => [
                  styles.signupBtn,
                  { backgroundColor: colors.secondary, opacity: pressed ? 0.85 : 1 },
                ]}
                onPress={() => router.replace('/')}>
                <Text style={styles.signupBtnText}>Create Account</Text>
              </Pressable>
            </View>

            {/* ── Login Link ── */}
            <View style={styles.bottomRow}>
              <Text style={[styles.bottomText, { color: colors.textSecondary }]}>
                Already have an account?{'  '}
              </Text>
              <TouchableOpacity onPress={() => router.replace('/')}>
                <Text style={[styles.bottomLink, { color: colors.primary }]}>Login</Text>
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
  scroll: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },

  backBtn: { marginBottom: 12 },
  backText: { fontSize: 15, fontWeight: '600' },

  brand: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#7C4DFF',
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 7,
  },
  logoText: { fontSize: 28, fontWeight: '900', color: '#fff' },
  appName: { fontSize: 42, fontWeight: '900', letterSpacing: 2, marginBottom: 6 },
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

  signupBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  signupBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },

  bottomRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  bottomText: { fontSize: 14 },
  bottomLink: { fontSize: 14, fontWeight: '700' },
});
