import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface BadgeProps {
  label: string;
  color: string;
  style?: ViewStyle;
  size?: 'sm' | 'md';
}

/**
 * Colored status / rank badge pill.
 * Automatically adds a semi-transparent tinted background.
 */
export function Badge({ label, color, style, size = 'md' }: BadgeProps) {
  const px = size === 'sm' ? 8 : 12;
  const py = size === 'sm' ? 3 : 5;
  const fs = size === 'sm' ? 10 : 12;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color + '25',
          borderColor: color + '60',
          paddingHorizontal: px,
          paddingVertical: py,
        },
        style,
      ]}>
      <Text style={[styles.label, { color, fontSize: fs }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: { fontWeight: '700', letterSpacing: 0.3 },
});
