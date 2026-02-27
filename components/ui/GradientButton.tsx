import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'danger';
}

/**
 * Cyan → Purple gradient button for the Neo Esports theme.
 * Falls back to a flat primary button in light mode.
 */
export function GradientButton({
  label,
  onPress,
  style,
  disabled = false,
  size = 'md',
  variant = 'primary',
}: GradientButtonProps) {
  const { colors, isDark } = useTheme();

  const gradientColors: [string, string] =
    variant === 'danger'
      ? ['#FF3B3B', '#8E2DE2']
      : ['#00E5FF', '#8E2DE2'];

  const paddingVertical = size === 'sm' ? 10 : size === 'lg' ? 18 : 14;
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 17 : 15;

  if (!isDark) {
    return (
      <TouchableOpacity
        style={[
          styles.btn,
          { backgroundColor: variant === 'danger' ? colors.danger : colors.primary, paddingVertical, opacity: disabled ? 0.5 : 1 },
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}>
        <Text style={[styles.label, { fontSize, color: '#fff' }]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.btn, { paddingVertical, opacity: disabled ? 0.5 : 1 }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
      />
      <Text style={[styles.label, { fontSize }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    color: '#0B0F14',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
