import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Switch,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientButton } from '@/components/ui/GradientButton';
import {
  TOURNAMENT_TYPES, GAME_MODES, CLASSIC_MAPS, WOW_MODES,
  GUN_CATEGORIES, GUNS_BY_CATEGORY, TournamentType, GameMode,
  ClassicMap, GunCategory, WOWMode,
} from '@/constants/tournamentConfig';

interface FormData {
  matchType: TournamentType;
  mode: GameMode;
  classicMap: ClassicMap;
  gunCategory: GunCategory | '';
  selectedGun: string;
  wowCode: string;
  wowMode: WOWMode;
  entryFee: string;
  slots: string;
  matchTime: string;
  autoMatch: boolean;
}

const STEPS = ['Settings', 'Entry', 'Preview'];

// ── Dropdown (module-level to keep hook state stable) ────────────────────────
function Dropdown({
  label, value, options, onSelect, placeholder, disabled = false,
}: {
  label: string; value: string; options: string[];
  onSelect: (v: string) => void; placeholder: string; disabled?: boolean;
}) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <View style={dd.wrapper}>
      <Text style={[dd.label, { color: colors.textSecondary }]}>{label}</Text>
      <TouchableOpacity
        style={[dd.trigger, { backgroundColor: colors.card, borderColor: open ? colors.primary : colors.border, opacity: disabled ? 0.5 : 1 }]}
        onPress={() => !disabled && setOpen((o) => !o)}
        activeOpacity={disabled ? 1 : 0.8}>
        <Text style={{ color: value ? colors.text : colors.textSecondary, flex: 1, fontSize: 15 }}>
          {value || placeholder}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 11 }}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={[dd.list, { backgroundColor: colors.card, borderColor: colors.primary }]}>
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={opt}
              style={[dd.item, { borderBottomColor: colors.border, borderBottomWidth: idx < options.length - 1 ? 1 : 0, backgroundColor: value === opt ? colors.primary + '22' : 'transparent' }]}
              onPress={() => { onSelect(opt); setOpen(false); }}>
              <Text style={{ color: value === opt ? colors.primary : colors.text, fontSize: 15, fontWeight: value === opt ? '600' : '400' }}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const dd = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  trigger: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 13 },
  list: { borderRadius: 12, borderWidth: 1, marginTop: 4, overflow: 'hidden' },
  item: { paddingHorizontal: 16, paddingVertical: 13 },
});

// ─────────────────────────────────────────────────────────────────────────────

export default function CreateChallengeScreen() {
  const { colors } = useTheme();
  const [step, setStep] = useState(0);
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState<FormData>({
    matchType: 'Classic',
    mode: 'Squad',
    classicMap: 'Erangel',
    gunCategory: '',
    selectedGun: '',
    wowCode: '',
    wowMode: '4v4',
    entryFee: '50',
    slots: '8',
    matchTime: '20:00',
    autoMatch: false,
  });

  const update = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const changeGunCategory = (cat: GunCategory) =>
    setForm((p) => ({ ...p, gunCategory: cat, selectedGun: '' }));

  const canProceed = () => {
    if (step === 0) {
      if (form.matchType === 'TDM') return form.gunCategory !== '' && form.selectedGun !== '';
      if (form.matchType === 'WOW') return form.wowCode.trim().length > 0;
    }
    return true;
  };

  function ChipSelect<T extends string>({ options, value, onSelect }: { options: T[]; value: T; onSelect: (v: T) => void }) {
    return (
      <View style={styles.chipRow}>
        {options.map((opt) => {
          const active = opt === value;
          return (
            <TouchableOpacity
              key={opt}
              style={[styles.chip, { backgroundColor: active ? colors.primary + '22' : colors.card, borderColor: active ? colors.primary : colors.border }]}
              onPress={() => onSelect(opt)}>
              <Text style={{ color: active ? colors.primary : colors.textSecondary, fontWeight: '700', fontSize: 13 }}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function Field({ label, value, onChange, placeholder, numeric = false }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; numeric?: boolean }) {
    return (
      <View style={styles.fieldWrapper}>
        <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>{label}</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={value} onChangeText={onChange} placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={numeric ? 'numeric' : 'default'}
        />
      </View>
    );
  }

  if (created) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.successScreen}>
          <Text style={{ fontSize: 64 }}>⚡</Text>
          <Text style={[styles.successTitle, { color: colors.text }]}>Challenge Live!</Text>
          <Text style={[styles.successSub, { color: colors.textSecondary }]}>
            Players can now find and join your challenge in the Arena.
          </Text>
          <GradientButton label="View Arena" onPress={() => router.replace('/(drawer)/challenge-arena')} size="lg" style={{ width: '100%', marginTop: 24 }} />
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
            <Text style={[styles.backLink, { color: colors.textSecondary }]}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => step > 0 ? setStep(step - 1) : router.back()}>
            <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Create Challenge</Text>
          <Text style={[styles.stepCount, { color: colors.textSecondary }]}>{step + 1}/{STEPS.length}</Text>
        </View>

        {/* Step dots */}
        <View style={styles.stepRow}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <View style={[styles.dot, { backgroundColor: i <= step ? colors.primary : colors.border, width: i === step ? 28 : 20, height: i === step ? 28 : 20, borderRadius: i === step ? 14 : 10 }]}>
                {i < step ? <Text style={styles.dotCheck}>✓</Text>
                  : i === step ? <Text style={styles.dotNum}>{i + 1}</Text> : null}
              </View>
              {i < STEPS.length - 1 && <View style={[styles.dotLine, { backgroundColor: i < step ? colors.primary : colors.border }]} />}
            </React.Fragment>
          ))}
        </View>

        <ScrollView style={styles.form} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Step 0 — Match Settings */}
          {step === 0 && (
            <View>
              <Text style={[styles.stepTitle, { color: colors.text }]}>Match Settings</Text>
              <Text style={[styles.stepSub, { color: colors.textSecondary }]}>Configure your challenge type and mode.</Text>

              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Match Type</Text>
              <ChipSelect options={TOURNAMENT_TYPES} value={form.matchType} onSelect={(v) => update('matchType', v)} />

              <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginTop: 16 }]}>Game Mode</Text>
              <ChipSelect options={GAME_MODES} value={form.mode} onSelect={(v) => update('mode', v)} />

              {form.matchType === 'Classic' && (
                <>
                  <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginTop: 16 }]}>Map</Text>
                  <ChipSelect options={CLASSIC_MAPS} value={form.classicMap} onSelect={(v) => update('classicMap', v)} />
                </>
              )}

              {form.matchType === 'TDM' && (
                <>
                  <Dropdown label="Gun Category" value={form.gunCategory} options={GUN_CATEGORIES}
                    onSelect={(v) => changeGunCategory(v as GunCategory)} placeholder="Select category..." />
                  <Dropdown label="Gun" value={form.selectedGun}
                    options={form.gunCategory ? GUNS_BY_CATEGORY[form.gunCategory as GunCategory] : []}
                    onSelect={(v) => update('selectedGun', v)} placeholder={form.gunCategory ? 'Select gun...' : 'Select category first...'}
                    disabled={!form.gunCategory} />
                </>
              )}

              {form.matchType === 'WOW' && (
                <>
                  <Field label="WOW Map Code *" value={form.wowCode} onChange={(v) => update('wowCode', v)} placeholder="Enter WOW map code..." />
                  <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>WOW Mode</Text>
                  <ChipSelect options={WOW_MODES} value={form.wowMode} onSelect={(v) => update('wowMode', v)} />
                </>
              )}
            </View>
          )}

          {/* Step 1 — Entry */}
          {step === 1 && (
            <View>
              <Text style={[styles.stepTitle, { color: colors.text }]}>Entry & Timing</Text>
              <Text style={[styles.stepSub, { color: colors.textSecondary }]}>Set entry fee, slots, and match time.</Text>
              <Field label="Entry Fee (₹)" value={form.entryFee} onChange={(v) => update('entryFee', v)} placeholder="e.g. 50" numeric />
              <Field label="Total Slots" value={form.slots} onChange={(v) => update('slots', v)} placeholder="e.g. 8" numeric />
              <Field label="Match Time (24hr IST)" value={form.matchTime} onChange={(v) => update('matchTime', v)} placeholder="e.g. 20:00" />
              <View style={[styles.toggleRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View>
                  <Text style={[styles.toggleLabel, { color: colors.text }]}>Auto-Match</Text>
                  <Text style={[styles.toggleSub, { color: colors.textSecondary }]}>Auto-fill slots when entry is paid</Text>
                </View>
                <Switch
                  value={form.autoMatch}
                  onValueChange={(v) => update('autoMatch', v)}
                  trackColor={{ false: colors.border, true: colors.primary + '80' }}
                  thumbColor={form.autoMatch ? colors.primary : colors.textSecondary}
                />
              </View>
            </View>
          )}

          {/* Step 2 — Preview */}
          {step === 2 && (
            <View>
              <Text style={[styles.stepTitle, { color: colors.text }]}>Preview</Text>
              <Text style={[styles.stepSub, { color: colors.textSecondary }]}>Confirm before publishing.</Text>
              <View style={[styles.previewCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                {[
                  ['Match Type', form.matchType],
                  ['Mode', form.mode],
                  form.matchType === 'Classic' ? ['Map', form.classicMap] : null,
                  form.matchType === 'TDM' ? ['Gun', `${form.gunCategory} — ${form.selectedGun}`] : null,
                  form.matchType === 'WOW' ? ['WOW Code', form.wowCode] : null,
                  form.matchType === 'WOW' ? ['WOW Mode', form.wowMode] : null,
                  ['Entry Fee', `₹${form.entryFee}`],
                  ['Slots', form.slots],
                  ['Match Time', `${form.matchTime} IST`],
                  ['Auto-Match', form.autoMatch ? 'On' : 'Off'],
                ].filter(Boolean).map(([k, v]) => (
                  <View key={k} style={[styles.previewRow, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.previewKey, { color: colors.textSecondary }]}>{k}</Text>
                    <Text style={[styles.previewVal, { color: colors.text }]}>{v}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
          <GradientButton
            label={step === STEPS.length - 1 ? '⚡  Publish Challenge' : 'Continue →'}
            onPress={() => { if (step < STEPS.length - 1) setStep(step + 1); else setCreated(true); }}
            disabled={!canProceed()}
            size="lg"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  backText: { fontSize: 15, fontWeight: '600' },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  stepCount: { fontSize: 14 },
  stepRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16 },
  dot: { justifyContent: 'center', alignItems: 'center' },
  dotCheck: { color: '#0B0F14', fontSize: 11, fontWeight: '800' },
  dotNum: { color: '#0B0F14', fontSize: 12, fontWeight: '800' },
  dotLine: { flex: 1, height: 2, marginHorizontal: 6 },
  form: { flex: 1, paddingHorizontal: 20 },
  stepTitle: { fontSize: 22, fontWeight: '800', marginBottom: 4, marginTop: 8 },
  stepSub: { fontSize: 14, marginBottom: 20 },
  fieldWrapper: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  input: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 16 },
  toggleLabel: { fontSize: 15, fontWeight: '700' },
  toggleSub: { fontSize: 12, marginTop: 2 },
  previewCard: { borderRadius: 14, padding: 18, borderWidth: 1 },
  previewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 },
  previewKey: { fontSize: 14 },
  previewVal: { fontSize: 14, fontWeight: '600' },
  footer: { padding: 20, paddingBottom: 24, borderTopWidth: 1 },
  successScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successTitle: { fontSize: 28, fontWeight: '900', marginTop: 16, marginBottom: 10 },
  successSub: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  backLink: { fontSize: 15, fontWeight: '600' },
});
