import { StyleSheet, Pressable, View, Text } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingScreen() {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Background Gradient Overlay */}
      <LinearGradient
        colors={
          isDark
            ? ['rgba(0, 229, 255, 0.1)', 'transparent', 'rgba(124, 77, 255, 0.1)']
            : ['rgba(26, 115, 232, 0.1)', 'transparent', 'rgba(255, 112, 67, 0.1)']
        }
        style={styles.gradientOverlay}
      />

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* App Name */}
        <Text
          style={[
            styles.appName,
            { color: colors.text },
          ]}>
          YouWe
        </Text>

        {/* Tagline */}
        <Text
          style={[
            styles.tagline,
            { color: isDark ? colors.primary : colors.secondary },
          ]}>
          Host. Join. Dominate.
        </Text>

        {/* CTA Button */}
        <Pressable
          style={({ pressed }) => [
            styles.ctaButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={() => router.replace('/(drawer)/slots')}>
          <Text style={styles.ctaButtonText}>Enter App</Text>
        </Pressable>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          BGMI Tournament Platform
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  appName: {
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 60,
    textAlign: 'center',
  },
  ctaButton: {
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 250,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 40,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
