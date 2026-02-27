// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'person.fill': 'person',
  'person.circle.fill': 'account-circle',
  'gamecontroller.fill': 'sports-esports',
  'sun.max.fill': 'wb-sunny',
  'moon.fill': 'nights-stay',
  'arrow.right.square': 'logout',
  'trophy.fill': 'emoji-events',
  'flame.fill': 'local-fire-department',
  'chart.bar.fill': 'leaderboard',
  'wallet.pass.fill': 'account-balance-wallet',
  'bell.fill': 'notifications',
  'bubble.left.fill': 'chat',
  'star.fill': 'star',
  'lock.fill': 'lock',
  'checkmark.seal.fill': 'verified',
  'xmark.circle.fill': 'cancel',
  'camera.fill': 'camera-alt',
  'clock.fill': 'schedule',
  'plus.circle.fill': 'add-circle',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
