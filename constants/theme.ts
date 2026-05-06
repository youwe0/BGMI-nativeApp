/**
 * BGMI Tournament Platform Theme Colors
 * Dark theme is primary, Light theme is secondary
 */

import { Platform } from 'react-native';

export const Colors = {
  dark: {
    background: '#0F172A',      // Midnight Blue
    card: '#1E293B',            // Dark Navy surface
    primary: '#FF6B00',         // Deep Orange
    secondary: '#F5B301',       // Gold
    text: '#FFFFFF',            // White
    textSecondary: '#94A3B8',   // Cool gray
    border: '#2A3445',          // Borders / Dividers
    success: '#00FF9D',         // Neon green (wins / positive)
    error: '#D72638',           // Crimson Red (live / alerts)
    danger: '#D72638',          // Crimson Red
    tint: '#FF6B00',
    icon: '#94A3B8',
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#FF6B00',
  },
  light: {
    background: '#0F172A',      // Same midnight blue — no light backgrounds
    card: '#1E293B',            // Dark Navy surface
    primary: '#FF6B00',         // Deep Orange
    secondary: '#F5B301',       // Gold
    text: '#FFFFFF',            // White
    textSecondary: '#94A3B8',   // Cool gray
    border: '#2A3445',          // Borders / Dividers
    success: '#00FF9D',         // Neon green
    error: '#D72638',           // Crimson Red
    danger: '#D72638',          // Crimson Red
    tint: '#FF6B00',
    icon: '#94A3B8',
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#FF6B00',
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
