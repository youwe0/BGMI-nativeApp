/**
 * BGMI Tournament Platform Theme Colors
 * Dark theme is primary, Light theme is secondary
 */

import { Platform } from 'react-native';

export const Colors = {
  dark: {
    background: '#0B0F14',      // Deep black
    card: '#141A22',            // Dark gray card background
    primary: '#00E5FF',         // Cyan accent
    secondary: '#7C4DFF',       // Violet accent
    text: '#EAEAEA',            // Light gray text
    textSecondary: '#9BA1A6',   // Muted text
    border: '#1F2937',          // Subtle border
    success: '#10B981',         // Green for available slots
    error: '#EF4444',           // Red for errors
    tint: '#00E5FF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#00E5FF',
  },
  light: {
    background: '#FFFFFF',      // White
    card: '#F5F7FA',            // Light gray card background
    primary: '#1A73E8',         // Blue accent
    secondary: '#FF7043',       // Orange accent
    text: '#1C1C1C',            // Dark gray text
    textSecondary: '#687076',   // Muted text
    border: '#E5E7EB',          // Subtle border
    success: '#10B981',         // Green for available slots
    error: '#EF4444',           // Red for errors
    tint: '#1A73E8',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#1A73E8',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
