import { Drawer } from 'expo-router/drawer';
import { Pressable, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

/* Gradient "TooToo" brand text — per-char color interpolation */
const BRAND_CHARS = ['T', 'o', 'o', 'T', 'o', 'o'];
const BRAND_PALETTE = ['#FF6B00', '#FD7900', '#FB8800', '#F99601', '#F7A501', '#F5B301'];

function GradientBrand() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {BRAND_CHARS.map((char, i) => (
        <Text key={i} style={{ color: BRAND_PALETTE[i], fontSize: 20, fontWeight: '800', letterSpacing: 0.3 }}>
          {char}
        </Text>
      ))}
    </View>
  );
}

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
        <View style={[styles.appIcon, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40', borderWidth: 1.5 }]}>
          <Text style={[styles.appIconText, { color: colors.primary }]}>TT</Text>
        </View>
        <Text style={[styles.appTitle, { color: colors.text }]}>Too Too</Text>
        <View style={[styles.profilePill, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '35' }]}>
          <IconSymbol name="person.circle.fill" size={12} color={colors.primary} />
          <Text style={[styles.profilePillText, { color: colors.primary }]}>View Profile</Text>
        </View>
      </TouchableOpacity>

      {/* Drawer items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* ── Bottom Actions ── */}
      <View style={[styles.bottomActions, { borderTopColor: colors.border }]}>
        {/* Theme — circular icon only */}
        <TouchableOpacity
          style={[styles.themeCircle, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={toggleTheme}
          activeOpacity={0.8}>
          <IconSymbol
            name={isDark ? 'sun.max.fill' : 'moon.fill'}
            size={18}
            color={isDark ? '#FFD700' : colors.secondary}
          />
        </TouchableOpacity>
        {/* Logout */}
        <Pressable
          style={[styles.logoutButton, { backgroundColor: colors.error + '18', borderColor: colors.error + '35' }]}
          onPress={() => router.replace('/')}>
          <IconSymbol name="arrow.right.square" size={17} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Drawer
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerBackground: () => (
          <LinearGradient
            colors={isDark
              ? [colors.background, colors.background + 'E8', colors.primary + '22']
              : [colors.background, colors.background + 'F0', colors.primary + '16']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
        headerTintColor: colors.text,
        headerTitle: () => null,
        drawerStyle: { backgroundColor: colors.background },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerActiveBackgroundColor: colors.primary + '18',
        drawerItemStyle: { borderRadius: 10, marginVertical: 1, height: 44 },
        drawerLabelStyle: { fontSize: 13, fontWeight: '600', marginLeft: -8 },
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerAvatarBtn}
              activeOpacity={0.8}>
              <IconSymbol name="person.circle.fill" size={26} color={colors.primary} />
            </TouchableOpacity>
            <GradientBrand />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('notifications')}
            style={styles.headerNotifBtn}
            activeOpacity={0.8}>
            <IconSymbol name="bell.fill" size={22} color={colors.text} />
          </TouchableOpacity>
        ),
      })}>

      <Drawer.Screen
        name="home"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => <IconSymbol name="house.fill" size={size - 2} color={color} />,
        }}
      />
      <Drawer.Screen
        name="challenge-arena"
        options={{
          title: 'Challenge Arena',
          drawerLabel: 'Challenge Arena',
          drawerIcon: ({ color, size }) => <IconSymbol name="flame.fill" size={size - 2} color={color} />,
        }}
      />
      <Drawer.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          drawerLabel: 'Leaderboard',
          drawerIcon: ({ color, size }) => <IconSymbol name="chart.bar.fill" size={size - 2} color={color} />,
        }}
      />
      <Drawer.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          drawerLabel: 'Wallet',
          drawerIcon: ({ color, size }) => <IconSymbol name="wallet.pass.fill" size={size - 2} color={color} />,
        }}
      />
      <Drawer.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          drawerLabel: 'Notifications',
          drawerIcon: ({ color, size }) => <IconSymbol name="bell.fill" size={size - 2} color={color} />,
        }}
      />

      {/* Hidden from sidebar */}
      <Drawer.Screen name="tournaments" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="slots" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="profile" options={{ title: 'Profile', drawerItemStyle: { display: 'none' } }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContent: { flex: 1, paddingTop: 16 },

  drawerHeader: {
    paddingHorizontal: 18, paddingBottom: 16,
    marginBottom: 10, borderBottomWidth: 1, alignItems: 'center',
  },
  appIcon: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  appIconText: { fontSize: 20, fontWeight: '900' },
  appTitle: { fontSize: 20, fontWeight: '800', marginBottom: 10 },
  profilePill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1,
  },
  profilePillText: { fontSize: 11, fontWeight: '700' },

  drawerItems: { flex: 1, paddingHorizontal: 10 },

  bottomActions: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 12,
    marginTop: 8, borderTopWidth: 1,
  },
  themeCircle: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, flexShrink: 0,
  },
  logoutButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 12, borderWidth: 1,
  },
  logoutText: { fontSize: 13, fontWeight: '700' },

  headerLeft: { flexDirection: 'row', alignItems: 'center', marginLeft: 14, gap: 8 },
  headerAvatarBtn: { padding: 2 },
  headerNotifBtn: { marginRight: 14, padding: 4 },
});
