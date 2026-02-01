import { Drawer } from 'expo-router/drawer';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function CustomDrawerContent(props: any) {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.drawerContent}>
      {/* Header */}
      <View style={[styles.drawerHeader, { borderBottomColor: colors.border }]}>
        <View style={[styles.appIcon, { backgroundColor: colors.primary }]}>
          <Text style={styles.appIconText}>YW</Text>
        </View>
        <Text style={[styles.appTitle, { color: colors.text }]}>YouWe</Text>
        <Text style={[styles.appSubtitle, { color: colors.textSecondary }]}>
          Tournament Platform
        </Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* Theme Toggle */}
      <Pressable
        style={[styles.themeToggle, { backgroundColor: colors.card }]}
        onPress={toggleTheme}>
        <IconSymbol
          name={isDark ? 'sun.max.fill' : 'moon.fill'}
          size={20}
          color={colors.text}
        />
        <Text style={[styles.themeToggleText, { color: colors.text }]}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </Pressable>

      {/* Logout Button */}
      <Pressable
        style={[styles.logoutButton, { backgroundColor: colors.error + '20' }]}
        onPress={() => {
          // In real app, this would handle logout
          router.replace('/');
        }}>
        <IconSymbol name="arrow.right.square" size={20} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '700',
        },
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerActiveBackgroundColor: colors.primary + '20',
        drawerItemStyle: {
          borderRadius: 12,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}>
      <Drawer.Screen
        name="slots"
        options={{
          title: 'Matches',
          drawerLabel: 'Matches',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="gamecontroller.fill" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="person.fill" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appIconText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  drawerItems: {
    flex: 1,
    paddingHorizontal: 12,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
