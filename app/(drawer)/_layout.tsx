import { Drawer } from 'expo-router/drawer';
import { Pressable, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

      {/* Header — tap to open profile */}
      <TouchableOpacity
        style={[styles.drawerHeader, { borderBottomColor: colors.border }]}
        onPress={() => props.navigation.navigate('profile')}
        activeOpacity={0.75}>
        <View style={[styles.appIcon, { backgroundColor: colors.primary }]}>
          <Text style={styles.appIconText}>TT</Text>
        </View>
        <Text style={[styles.appTitle, { color: colors.text }]}>Too Too</Text>
        <Text style={[styles.appSubtitle, { color: colors.textSecondary }]}>
          Tournament Platform
        </Text>
        <View
          style={[
            styles.profilePill,
            {
              backgroundColor: colors.primary + '18',
              borderColor: colors.primary + '40',
            },
          ]}>
          <IconSymbol name="person.circle.fill" size={13} color={colors.primary} />
          <Text style={[styles.profilePillText, { color: colors.primary }]}>View Profile</Text>
        </View>
      </TouchableOpacity>

      {/* Drawer items (Home, Tournaments visible) */}
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
        <Text style={[styles.actionText, { color: colors.text }]}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </Pressable>

      {/* Logout */}
      <Pressable
        style={[styles.logoutButton, { backgroundColor: colors.error + '20' }]}
        onPress={() => router.replace('/')}>
        <IconSymbol name="arrow.right.square" size={20} color={colors.error} />
        <Text style={[styles.actionText, { color: colors.error }]}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { colors } = useTheme();

  return (
    <Drawer
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        drawerStyle: { backgroundColor: colors.background },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerActiveBackgroundColor: colors.primary + '20',
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { fontSize: 16, fontWeight: '600' },
        // Profile icon in every screen's top-right header
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('profile')}
            style={styles.headerProfileBtn}>
            <IconSymbol name="person.circle.fill" size={28} color={colors.primary} />
          </Pressable>
        ),
      })}>

      {/* Home — shown in sidebar */}
      <Drawer.Screen
        name="home"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="house.fill" size={size} color={color} />
          ),
        }}
      />

      {/* Challenge Arena — shown in sidebar */}
      <Drawer.Screen
        name="challenge-arena"
        options={{
          title: 'Challenge Arena',
          drawerLabel: 'Challenge Arena',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="flame.fill" size={size} color={color} />
          ),
        }}
      />

      {/* Tournaments — shown in sidebar */}
      <Drawer.Screen
        name="tournaments"
        options={{
          title: 'Tournaments',
          drawerLabel: 'Tournaments',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="trophy.fill" size={size} color={color} />
          ),
        }}
      />

      {/* Leaderboard — shown in sidebar */}
      <Drawer.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          drawerLabel: 'Leaderboard',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="chart.bar.fill" size={size} color={color} />
          ),
        }}
      />

      {/* Wallet — shown in sidebar */}
      <Drawer.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          drawerLabel: 'Wallet',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="wallet.pass.fill" size={size} color={color} />
          ),
        }}
      />

      {/* Notifications — shown in sidebar */}
      <Drawer.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          drawerLabel: 'Notifications',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="bell.fill" size={size} color={color} />
          ),
        }}
      />

      {/* Slots — hidden from sidebar */}
      <Drawer.Screen
        name="slots"
        options={{
          title: 'Matches',
          drawerItemStyle: { display: 'none' },
        }}
      />

      {/* Profile — hidden from sidebar, opened via header icon or drawer header */}
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContent: { flex: 1, paddingTop: 20 },

  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  appIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appIconText: { fontSize: 26, fontWeight: '800', color: '#000' },
  appTitle: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  appSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  profilePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  profilePillText: { fontSize: 11, fontWeight: '700' },

  drawerItems: { flex: 1, paddingHorizontal: 12 },

  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
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
  actionText: { fontSize: 16, fontWeight: '600' },

  headerProfileBtn: { marginRight: 16, padding: 4 },
});
