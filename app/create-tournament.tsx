import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import {
  TOURNAMENT_TYPES,
  GAME_MODES,
  CLASSIC_MAPS,
  WOW_MODES,
  GUN_CATEGORIES,
  GUNS_BY_CATEGORY,
  ROOM_TYPES,
  TournamentType,
  GameMode,
  ClassicMap,
  GunCategory,
  WOWMode,
  RoomType,
} from '@/constants/tournamentConfig';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  description: string;
  // Tournament type
  tournamentType: TournamentType;
  // Classic fields
  classicMode: GameMode;
  classicMap: ClassicMap;
  // TDM fields
  tdmMode: GameMode;
  gunCategory: GunCategory | '';
  selectedGun: string;
  // WOW fields
  wowMapCode: string;
  wowMode: WOWMode;
  // Common
  maxTeams: string;
  entryFee: string;
  prizePool: string;
  date: string;
  time: string;
  roomType: RoomType;
}

const STEPS = ['Info', 'Game', 'Entry', 'Review'];

// ─── DropdownSelect (module-level to keep hook state stable) ─────────────────

function DropdownSelect({
  label,
  value,
  options,
  onSelect,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (v: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <View style={dropdownStyles.wrapper}>
      <Text style={[dropdownStyles.label, { color: colors.textSecondary }]}>{label}</Text>
      <TouchableOpacity
        style={[
          dropdownStyles.trigger,
          {
            backgroundColor: colors.card,
            borderColor: open ? colors.primary : colors.border,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        onPress={() => !disabled && setOpen((o) => !o)}
        activeOpacity={disabled ? 1 : 0.7}>
        <Text
          style={{
            color: value ? colors.text : colors.textSecondary,
            fontSize: 15,
            flex: 1,
          }}>
          {value || placeholder}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 11 }}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && (
        <View
          style={[
            dropdownStyles.list,
            { backgroundColor: colors.card, borderColor: colors.primary },
          ]}>
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={opt}
              style={[
                dropdownStyles.item,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: idx < options.length - 1 ? 1 : 0,
                  backgroundColor: value === opt ? colors.primary + '22' : 'transparent',
                },
              ]}
              onPress={() => {
                onSelect(opt);
                setOpen(false);
              }}>
              <Text
                style={{
                  color: value === opt ? colors.primary : colors.text,
                  fontSize: 15,
                  fontWeight: value === opt ? '600' : '400',
                }}>
                {opt}
              </Text>
              {value === opt && (
                <Text style={{ color: colors.primary, fontSize: 13 }}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const dropdownStyles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 50,
  },
  list: {
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
});

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function CreateTournamentScreen() {
  const { colors } = useTheme();
  const [step, setStep] = useState(0);
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    description: '',
    tournamentType: 'Classic',
    classicMode: 'Squad',
    classicMap: 'Erangel',
    tdmMode: 'Squad',
    gunCategory: '',
    selectedGun: '',
    wowMapCode: '',
    wowMode: '4v4',
    maxTeams: '25',
    entryFee: '50',
    prizePool: '1000',
    date: '2026-03-15',
    time: '20:00',
    roomType: 'Public',
  });

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Reset gun when category changes
  const handleGunCategoryChange = (category: GunCategory) => {
    setForm((prev) => ({ ...prev, gunCategory: category, selectedGun: '' }));
  };

  // Reset game-specific fields when tournament type changes
  const handleTournamentTypeChange = (type: TournamentType) => {
    setForm((prev) => ({
      ...prev,
      tournamentType: type,
      gunCategory: '',
      selectedGun: '',
    }));
  };

  const canProceed = (): boolean => {
    if (step === 0) return form.name.trim().length >= 3;
    if (step === 1) {
      if (form.tournamentType === 'TDM')
        return form.gunCategory !== '' && form.selectedGun !== '';
      if (form.tournamentType === 'WOW') return form.wowMapCode.trim().length >= 1;
    }
    return true;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setCreated(true);
  };

  // Build the game-settings summary for Review / Success
  const getGameSummary = (): [string, string][] => {
    switch (form.tournamentType) {
      case 'Classic':
        return [
          ['Type', 'Classic'],
          ['Mode', form.classicMode],
          ['Map', form.classicMap],
        ];
      case 'TDM':
        return [
          ['Type', 'TDM'],
          ['Mode', form.tdmMode],
          ['Gun Category', form.gunCategory || '-'],
          ['Gun', form.selectedGun || '-'],
        ];
      case 'WOW':
        return [
          ['Type', 'WOW Mode'],
          ['Map Code', form.wowMapCode || '-'],
          ['WOW Mode', form.wowMode],
        ];
    }
  };

  // ── Inline sub-components (no hooks, safe inside parent) ──────────────────

  function ChipSelect<T extends string>({
    options,
    value,
    onSelect,
  }: {
    options: T[];
    value: T;
    onSelect: (v: T) => void;
  }) {
    return (
      <View style={styles.chipRow}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <TouchableOpacity
              key={opt}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? colors.primary + '22' : colors.card,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
              onPress={() => onSelect(opt)}>
              <Text
                style={{
                  color: active ? colors.primary : colors.textSecondary,
                  fontWeight: '600',
                  fontSize: 14,
                }}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function Field({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    multiline = false,
  }: {
    label: string;
    value: string;
    onChangeText: (v: string) => void;
    placeholder: string;
    keyboardType?: 'default' | 'numeric';
    multiline?: boolean;
  }) {
    return (
      <View style={styles.fieldWrapper}>
        <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>{label}</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text,
              height: multiline ? 80 : 50,
              textAlignVertical: multiline ? 'top' : 'center',
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={keyboardType}
          multiline={multiline}
        />
      </View>
    );
  }

  // ── Success screen ────────────────────────────────────────────────────────

  if (created) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.successContainer}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.successIcon, { backgroundColor: colors.primary + '22' }]}>
            <Text style={{ fontSize: 52 }}>🏆</Text>
          </View>
          <Text style={[styles.successTitle, { color: colors.text }]}>Tournament Created!</Text>
          <Text style={[styles.successSub, { color: colors.textSecondary }]}>
            "{form.name}" is now live. Players can discover and register for your tournament.
          </Text>

          <View
            style={[styles.successCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {(
              [
                ...getGameSummary(),
                ['Max Teams', form.maxTeams],
                ['Entry Fee', `₹${form.entryFee}`],
                ['Prize Pool', `₹${form.prizePool}`],
                ['Room Type', form.roomType],
                ['Date', form.date],
                ['Time', `${form.time} IST`],
              ] as [string, string][]
            ).map(([key, val]) => (
              <View key={key} style={styles.successRow}>
                <Text style={[styles.successKey, { color: colors.textSecondary }]}>{key}</Text>
                <Text style={[styles.successVal, { color: colors.text }]}>{val}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/(drawer)/tournaments')}>
            <Text style={[styles.primaryBtnText, { color: '#0B0F14' }]}>View All Tournaments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.outlineBtn, { borderColor: colors.border }]}
            onPress={() => router.back()}>
            <Text style={[styles.outlineBtnText, { color: colors.textSecondary }]}>Go Back</Text>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Main form ─────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={[styles.formHeader, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => (step > 0 ? setStep(step - 1) : router.back())}
            style={styles.backBtn}>
            <Text style={[styles.backBtnText, { color: colors.primary }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.formTitle, { color: colors.text }]}>Create Tournament</Text>
          <Text style={[styles.stepCounter, { color: colors.textSecondary }]}>
            {step + 1}/{STEPS.length}
          </Text>
        </View>

        {/* Step indicator */}
        <View style={styles.stepIndicator}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepDot,
                    {
                      backgroundColor: i <= step ? colors.primary : colors.border,
                      width: i === step ? 30 : 22,
                      height: i === step ? 30 : 22,
                      borderRadius: i === step ? 15 : 11,
                    },
                  ]}>
                  {i < step ? (
                    <Text style={{ color: '#0B0F14', fontSize: 11, fontWeight: '800' }}>✓</Text>
                  ) : i === step ? (
                    <Text style={{ color: '#0B0F14', fontSize: 12, fontWeight: '800' }}>
                      {i + 1}
                    </Text>
                  ) : null}
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    { color: i === step ? colors.primary : colors.textSecondary },
                  ]}>
                  {s}
                </Text>
              </View>
              {i < STEPS.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    { backgroundColor: i < step ? colors.primary : colors.border },
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Form content */}
        <ScrollView
          style={styles.formContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* ── Step 1: Info ── */}
          {step === 0 && (
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: colors.text }]}>Tournament Info</Text>
              <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
                Give your tournament a name players will remember.
              </Text>
              <Field
                label="Tournament Name *"
                value={form.name}
                onChangeText={(v) => updateField('name', v)}
                placeholder="e.g. Cyber Cup Season 2"
              />
              <Field
                label="Description (optional)"
                value={form.description}
                onChangeText={(v) => updateField('description', v)}
                placeholder="Tell players what makes your tournament special..."
                multiline
              />
            </View>
          )}

          {/* ── Step 2: Game Settings ── */}
          {step === 1 && (
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: colors.text }]}>Game Settings</Text>
              <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
                Pick a tournament type and configure the match settings.
              </Text>

              {/* Tournament type selector */}
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                Tournament Type
              </Text>
              <View style={styles.typeTabs}>
                {TOURNAMENT_TYPES.map((type) => {
                  const active = form.tournamentType === type;
                  const meta: Record<TournamentType, { emoji: string; sub: string }> = {
                    Classic: { emoji: '🗺️', sub: 'Battle Royale' },
                    TDM: { emoji: '🔫', sub: 'Team Deathmatch' },
                    WOW: { emoji: '⚡', sub: 'WOW Mode' },
                  };
                  return (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeTab,
                        {
                          backgroundColor: active ? colors.primary : colors.card,
                          borderColor: active ? colors.primary : colors.border,
                        },
                      ]}
                      onPress={() => handleTournamentTypeChange(type)}>
                      <Text style={{ fontSize: 22 }}>{meta[type].emoji}</Text>
                      <Text
                        style={{
                          color: active ? '#0B0F14' : colors.text,
                          fontWeight: '700',
                          fontSize: 13,
                          marginTop: 4,
                        }}>
                        {type}
                      </Text>
                      <Text
                        style={{
                          color: active ? '#0B0F1480' : colors.textSecondary,
                          fontSize: 10,
                          marginTop: 2,
                        }}>
                        {meta[type].sub}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* ── Classic section ── */}
              {form.tournamentType === 'Classic' && (
                <View style={styles.section}>
                  <View
                    style={[
                      styles.sectionBadge,
                      {
                        backgroundColor: colors.primary + '18',
                        borderColor: colors.primary + '40',
                      },
                    ]}>
                    <Text style={{ fontSize: 14 }}>🗺️</Text>
                    <Text style={[styles.sectionBadgeText, { color: colors.primary }]}>
                      Classic — Battle Royale
                    </Text>
                  </View>

                  <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginTop: 18 }]}>
                    Game Mode
                  </Text>
                  <ChipSelect
                    options={GAME_MODES}
                    value={form.classicMode}
                    onSelect={(v) => updateField('classicMode', v)}
                  />

                  <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginTop: 20 }]}>
                    Map
                  </Text>
                  <ChipSelect
                    options={CLASSIC_MAPS}
                    value={form.classicMap}
                    onSelect={(v) => updateField('classicMap', v)}
                  />
                </View>
              )}

              {/* ── TDM section ── */}
              {form.tournamentType === 'TDM' && (
                <View style={styles.section}>
                  <View
                    style={[
                      styles.sectionBadge,
                      {
                        backgroundColor: colors.secondary + '18',
                        borderColor: colors.secondary + '40',
                      },
                    ]}>
                    <Text style={{ fontSize: 14 }}>🔫</Text>
                    <Text style={[styles.sectionBadgeText, { color: colors.secondary }]}>
                      TDM — Team Deathmatch
                    </Text>
                  </View>

                  <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginTop: 18 }]}>
                    Game Mode
                  </Text>
                  <ChipSelect
                    options={GAME_MODES}
                    value={form.tdmMode}
                    onSelect={(v) => updateField('tdmMode', v)}
                  />

                  <DropdownSelect
                    label="Gun Category"
                    value={form.gunCategory}
                    options={GUN_CATEGORIES}
                    onSelect={(v) => handleGunCategoryChange(v as GunCategory)}
                    placeholder="Select a gun category..."
                  />

                  <DropdownSelect
                    label="Gun"
                    value={form.selectedGun}
                    options={
                      form.gunCategory
                        ? GUNS_BY_CATEGORY[form.gunCategory as GunCategory]
                        : []
                    }
                    onSelect={(v) => updateField('selectedGun', v)}
                    placeholder={
                      form.gunCategory ? 'Select a gun...' : 'Select a category first...'
                    }
                    disabled={!form.gunCategory}
                  />
                </View>
              )}

              {/* ── WOW section ── */}
              {form.tournamentType === 'WOW' && (
                <View style={styles.section}>
                  <View
                    style={[
                      styles.sectionBadge,
                      { backgroundColor: '#FFD70020', borderColor: '#FFD70050' },
                    ]}>
                    <Text style={{ fontSize: 14 }}>⚡</Text>
                    <Text style={[styles.sectionBadgeText, { color: '#FFD700' }]}>
                      WOW — Custom Mode
                    </Text>
                  </View>

                  <Field
                    label="WOW Map Code *"
                    value={form.wowMapCode}
                    onChangeText={(v) => updateField('wowMapCode', v)}
                    placeholder="Enter the WOW map code..."
                  />

                  <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                    WOW Mode
                  </Text>
                  <ChipSelect
                    options={WOW_MODES}
                    value={form.wowMode}
                    onSelect={(v) => updateField('wowMode', v)}
                  />
                </View>
              )}
            </View>
          )}

          {/* ── Step 3: Entry & Schedule ── */}
          {step === 2 && (
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: colors.text }]}>Entry & Schedule</Text>
              <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
                Set team limits, fees, prize pool, and match timing.
              </Text>
              <Field
                label="Max Teams"
                value={form.maxTeams}
                onChangeText={(v) => updateField('maxTeams', v)}
                placeholder="e.g. 25"
                keyboardType="numeric"
              />
              <Field
                label="Entry Fee (₹)"
                value={form.entryFee}
                onChangeText={(v) => updateField('entryFee', v)}
                placeholder="e.g. 50"
                keyboardType="numeric"
              />
              <Field
                label="Prize Pool (₹)"
                value={form.prizePool}
                onChangeText={(v) => updateField('prizePool', v)}
                placeholder="e.g. 1000"
                keyboardType="numeric"
              />
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Room Type</Text>
              <ChipSelect
                options={ROOM_TYPES}
                value={form.roomType}
                onSelect={(v) => updateField('roomType', v)}
              />
              <Field
                label="Tournament Date"
                value={form.date}
                onChangeText={(v) => updateField('date', v)}
                placeholder="YYYY-MM-DD"
              />
              <Field
                label="Start Time (24hr IST)"
                value={form.time}
                onChangeText={(v) => updateField('time', v)}
                placeholder="e.g. 20:00"
              />
            </View>
          )}

          {/* ── Step 4: Review ── */}
          {step === 3 && (
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: colors.text }]}>Review</Text>
              <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
                Confirm everything looks right before going live.
              </Text>
              <View
                style={[
                  styles.reviewCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <Text style={[styles.reviewName, { color: colors.text }]}>
                  {form.name || 'Unnamed Tournament'}
                </Text>
                {form.description ? (
                  <Text style={[styles.reviewDesc, { color: colors.textSecondary }]}>
                    {form.description}
                  </Text>
                ) : null}
                <View style={[styles.reviewDivider, { backgroundColor: colors.border }]} />
                {(
                  [
                    ...getGameSummary(),
                    ['Max Teams', form.maxTeams],
                    ['Entry Fee', `₹${form.entryFee}`],
                    ['Prize Pool', `₹${form.prizePool}`],
                    ['Room Type', form.roomType],
                    ['Date', form.date],
                    ['Time', `${form.time} IST`],
                  ] as [string, string][]
                ).map(([key, val]) => (
                  <View key={key} style={styles.reviewRow}>
                    <Text style={[styles.reviewKey, { color: colors.textSecondary }]}>{key}</Text>
                    <Text style={[styles.reviewVal, { color: colors.text }]}>{val}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Footer */}
        <View
          style={[
            styles.formFooter,
            { borderTopColor: colors.border, backgroundColor: colors.background },
          ]}>
          {!canProceed() && step === 0 && (
            <Text style={[styles.validationMsg, { color: colors.error }]}>
              Tournament name must be at least 3 characters
            </Text>
          )}
          {!canProceed() && step === 1 && form.tournamentType === 'TDM' && (
            <Text style={[styles.validationMsg, { color: colors.error }]}>
              Please select a gun category and a specific gun
            </Text>
          )}
          {!canProceed() && step === 1 && form.tournamentType === 'WOW' && (
            <Text style={[styles.validationMsg, { color: colors.error }]}>
              Please enter a WOW map code
            </Text>
          )}
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { backgroundColor: canProceed() ? colors.primary : colors.border },
            ]}
            onPress={handleNext}
            disabled={!canProceed()}>
            <Text
              style={[
                styles.primaryBtnText,
                { color: canProceed() ? '#0B0F14' : colors.textSecondary },
              ]}>
              {step === STEPS.length - 1 ? '🏆  Create Tournament' : 'Continue →'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backBtn: {},
  backBtnText: { fontSize: 15, fontWeight: '600' },
  formTitle: { fontSize: 17, fontWeight: '700' },
  stepCounter: { fontSize: 14 },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  stepItem: { alignItems: 'center', gap: 6 },
  stepDot: { justifyContent: 'center', alignItems: 'center' },
  stepLabel: { fontSize: 10, fontWeight: '600' },
  stepLine: { flex: 1, height: 2, marginHorizontal: 6, marginBottom: 16 },
  formContent: { flex: 1, paddingHorizontal: 20 },
  stepContent: { paddingTop: 8 },
  stepTitle: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  stepDesc: { fontSize: 14, marginBottom: 22, lineHeight: 20 },
  fieldWrapper: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 },
  chip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5 },
  // Tournament type tabs
  typeTabs: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  typeTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 2,
  },
  // Section container
  section: { marginTop: 2 },
  sectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  sectionBadgeText: { fontSize: 14, fontWeight: '700' },
  // Review
  reviewCard: { borderRadius: 14, padding: 20, borderWidth: 1, marginTop: 4 },
  reviewName: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  reviewDesc: { fontSize: 14, marginBottom: 14, lineHeight: 20 },
  reviewDivider: { height: 1, marginBottom: 14 },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
  },
  reviewKey: { fontSize: 14 },
  reviewVal: { fontSize: 14, fontWeight: '600' },
  // Footer
  formFooter: { padding: 20, paddingBottom: 24, borderTopWidth: 1 },
  validationMsg: { fontSize: 12, marginBottom: 8 },
  primaryBtn: { borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { fontSize: 16, fontWeight: '700' },
  outlineBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 12,
  },
  outlineBtnText: { fontSize: 15, fontWeight: '600' },
  // Success
  successContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  successTitle: { fontSize: 28, fontWeight: '800', marginBottom: 10, textAlign: 'center' },
  successSub: { fontSize: 14, textAlign: 'center', marginBottom: 28, lineHeight: 22 },
  successCard: {
    width: '100%',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    marginBottom: 28,
  },
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
  },
  successKey: { fontSize: 14 },
  successVal: { fontSize: 14, fontWeight: '600' },
});
