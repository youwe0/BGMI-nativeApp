import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
  padding?: number;
}

/**
 * Neo Esports glassmorphism card.
 * Dark: semi-transparent bg with glowing primary border.
 * Light: standard card with subtle border.
 */
export function GlassCard({ children, style, glowColor, padding = 16 }: GlassCardProps) {
  const { colors, isDark } = useTheme();
  const glow = glowColor ?? colors.primary;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isDark ? glow + '50' : colors.border,
          padding,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
  },
});
