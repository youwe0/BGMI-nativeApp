import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

export default function LandingScreen() {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      {/* Full-screen gradient background */}
      <LinearGradient
        colors={
          isDark
            ? ["#0B0F14", "#0d1520", "#0B0F14"]
            : ["#f0f4ff", "#ffffff", "#f5f0ff"]
        }
        style={StyleSheet.absoluteFill}
      />

      {/* Corner glows */}
      <View style={[styles.glowTopLeft, { backgroundColor: colors.primary }]} />
      <View
        style={[styles.glowBottomRight, { backgroundColor: colors.secondary }]}
      />

      <SafeAreaView style={styles.safe}>
        {/* ── Hero — everything in one centered block ── */}
        <View style={styles.hero}>
          <View
            style={[styles.logoOuter, { borderColor: colors.primary + "70" }]}
          >
            {/* Inner: clips the image to a perfect circle */}
            <View style={styles.logoInner}>
              <Image
                source={require("../../assets/images/AppLOGO.png")}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* App name */}
          <Text style={[styles.appName, { color: colors.text }]}>Too Too</Text>

          {/* Tagline */}
          <Text style={[styles.tagline, { color: colors.primary }]}>
            Host. Join. Dominate.
          </Text>

          {/* Feature pills */}
          <View style={styles.pills}>
            {["⚡ Challenges", "🏆 Tournaments", "💰 Prizes"].map((label) => (
              <View
                key={label}
                style={[
                  styles.pill,
                  {
                    backgroundColor: colors.primary + "12",
                    borderColor: colors.primary + "30",
                  },
                ]}
              >
                <Text
                  style={[styles.pillText, { color: colors.textSecondary }]}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {/* ── CTA Buttons ── */}
          <View style={styles.btnRow}>
            {/* Login — gradient fill */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/login")}
              style={styles.btnWrap}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.loginBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginBtnText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up — outline */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/signup")}
              style={[styles.signupBtn, { borderColor: colors.primary + "60" }]}
            >
              <Text style={[styles.signupBtnText, { color: colors.text }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  safe: { flex: 1 },

  glowTopLeft: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.12,
  },
  glowBottomRight: {
    position: "absolute",
    bottom: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.14,
  },

  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 28,
    paddingVertical: 20,
  },

  // Outer View: just the glowing border ring (no overflow clipping)
  logoOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    padding: 3,
    shadowColor: "#00E5FF",
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
  },
  // Inner View: clips image to a perfect circle (no border, no gap)
  logoInner: {
    flex: 1,
    // borderRadius: 52,
    overflow: "hidden",
  },
  logoImage: { width: "100%", height: "100%", borderRadius: 52 },

  appName: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },

  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: { fontSize: 12, fontWeight: "600" },

  btnRow: { flexDirection: "row", gap: 12, width: "100%" },
  btnWrap: { flex: 1 },
  loginBtn: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#00E5FF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },

  signupBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1.5,
  },
  signupBtnText: { fontSize: 15, fontWeight: "700", letterSpacing: 0.5 },
});
