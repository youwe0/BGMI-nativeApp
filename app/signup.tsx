import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function SignUpScreen() {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        {/* ── Hero Header ── */}
        <LinearGradient
          colors={[colors.background as string, colors.secondary + '30', colors.card as string]}
          style={styles.heroArea}>
          <View style={[styles.glow, { backgroundColor: colors.secondary }]} />

          <SafeAreaView edges={['top']}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Text style={[styles.backText, { color: colors.secondary }]}>← Back</Text>
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.heroContent}>
            {/* <View style={[styles.logoRing, { borderColor: colors.secondary + '55' }]}>
              <LinearGradient
                colors={[colors.secondary, colors.primary + 'DD']}
                style={styles.logoGrad}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.logoText}>TT</Text>
              </LinearGradient>
            </View> */}
            <Text style={[styles.heroTitle, { color: colors.text }]}>Join the Arena</Text>
            <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
              Create your Too Too account
            </Text>
          </View>
        </LinearGradient>

        {/* ── Form Sheet ── */}
        <ScrollView
          style={[styles.sheet, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.sheetContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          <InputField
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="e.g. ProGamer99"
            colors={colors}
          />
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            keyboardType="email-address"
            colors={colors}
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a strong password"
            secureTextEntry
            colors={colors}
          />
          <InputField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter your password"
            secureTextEntry
            colors={colors}
          />

          {/* Terms note */}
          <Text style={[styles.termsText, { color: colors.textSecondary }]}>
            By creating an account you agree to our{' '}
            <Text style={{ color: colors.secondary }}>Terms of Service</Text>
            {' & '}
            <Text style={{ color: colors.secondary }}>Privacy Policy</Text>
          </Text>

          {/* Create Account Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.replace('/login')}
            style={styles.primaryBtnWrap}>
            <LinearGradient
              colors={[colors.secondary, colors.primary]}
              style={styles.primaryBtn}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.primaryBtnText}>Create Account  →</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          {/* Login link */}
          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: colors.border }]}
            onPress={() => router.replace('/login')}
            activeOpacity={0.85}>
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function InputField({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry, colors }: any) {
  return (
    <View style={styles.field}>
      <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>{label}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType ?? 'default'}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry ?? false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  heroArea: { paddingBottom: 28 },
  glow: {
    position: 'absolute', top: -40, left: -40,
    width: 160, height: 160, borderRadius: 80, opacity: 0.15,
  },
  backBtn: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
  backText: { fontSize: 15, fontWeight: '600' },

  heroContent: { alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  logoRing: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 2,
    padding: 4, marginBottom: 14,
    shadowColor: '#F5B301', shadowOpacity: 0.35, shadowRadius: 14, elevation: 8,
  },
  logoGrad: { flex: 1, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 30, fontWeight: '900', color: '#fff' },
  heroTitle: { fontSize: 26, fontWeight: '800', marginBottom: 6 },
  heroSub: { fontSize: 14 },

  sheet: { flex: 1 },
  sheetContent: { paddingHorizontal: 24, paddingTop: 24 },

  field: { marginBottom: 16 },
  fieldLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' },
  input: {
    borderRadius: 14, borderWidth: 1,
    paddingHorizontal: 16, paddingVertical: 15, fontSize: 15,
  },

  termsText: { fontSize: 12, lineHeight: 18, marginBottom: 20, textAlign: 'center' },

  primaryBtnWrap: { marginBottom: 20 },
  primaryBtn: {
    borderRadius: 14, paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#F5B301', shadowOpacity: 0.3,
    shadowRadius: 10, elevation: 6,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },

  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  divider: { flex: 1, height: 1 },
  dividerText: { fontSize: 12, fontWeight: '600' },

  secondaryBtn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1.5 },
  secondaryBtnText: { fontSize: 15, fontWeight: '700' },
});
