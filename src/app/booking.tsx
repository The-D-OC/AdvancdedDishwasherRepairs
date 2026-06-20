import { useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { BRANDS, SERVICES } from '@/lib/data';

const URGENCY = [
  { value: 'emergency', label: '🚨 Emergency (4 hrs)' },
  { value: 'same-day', label: '⚡ Same Day' },
  { value: 'next-day', label: '📅 Next Day' },
  { value: 'planned', label: '🗓️ Planned' },
];

export default function BookingPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', brand: '', model: '', service: '', urgency: '', issue: '', address: '', postcode: '', honeypot: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function submit() {
    if (form.honeypot) return;
    const required = ['name', 'email', 'phone', 'service', 'urgency', 'address', 'postcode'];
    if (required.some((k) => !(form as any)[k])) {
      const msg = 'Please fill in all required fields.';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Required', msg);
      return;
    }
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  }

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Home / Book a Repair</Text>
          <Text style={styles.title}>Book a Repair</Text>
          <Text style={styles.sub}>Fill in the form and we'll confirm your booking within 30 minutes.</Text>
          <View style={styles.badges}>
            {['30 min confirmation', '98% first-time fix', '90-day warranty'].map((b) => (
              <View key={b} style={styles.badge}><Text style={styles.badgeText}>✓ {b}</Text></View>
            ))}
          </View>
        </View>
      </View>

      <Section>
        {sent ? (
          <View style={styles.success}>
            <Text style={styles.successIcon}>🎉</Text>
            <Text style={styles.successTitle}>Booking Request Received!</Text>
            <Text style={styles.successText}>We'll confirm your booking within 30 minutes. Check your email at {form.email}.</Text>
          </View>
        ) : (
          <View style={styles.form}>
            <TextInput style={styles.honeypot} value={form.honeypot} onChangeText={(v) => setForm({ ...form, honeypot: v })} tabIndex={-1 as any} aria-hidden />

            <Text style={styles.sectionTitle}>Your Details</Text>
            <View style={styles.row}>
              <F label="Full Name *" value={form.name} set={(v) => setForm({ ...form, name: v })} ph="Full name" />
              <F label="Company" value={form.company} set={(v) => setForm({ ...form, company: v })} ph="Company name" />
            </View>
            <View style={styles.row}>
              <F label="Email *" value={form.email} set={(v) => setForm({ ...form, email: v })} ph="Email address" kb="email-address" />
              <F label="Phone *" value={form.phone} set={(v) => setForm({ ...form, phone: v })} ph="Phone number" kb="phone-pad" />
            </View>

            <Text style={[styles.sectionTitle, { marginTop: Spacing.three }]}>Machine Details</Text>
            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.label}>Brand</Text>
                <View style={styles.chips}>
                  {BRANDS.slice(0, 4).map((b) => (
                    <Pressable key={b.slug} onPress={() => setForm({ ...form, brand: b.name })} style={[styles.chip, form.brand === b.name && styles.chipOn]}>
                      <Text style={[styles.chipText, form.brand === b.name && styles.chipTextOn]}>{b.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <F label="Model" value={form.model} set={(v) => setForm({ ...form, model: v })} ph="e.g. AM15" />
            </View>

            <Text style={[styles.sectionTitle, { marginTop: Spacing.three }]}>Service Required *</Text>
            <View style={styles.optGrid}>
              {SERVICES.map((s) => (
                <Pressable key={s.slug} onPress={() => setForm({ ...form, service: s.slug })} style={[styles.optCard, form.service === s.slug && styles.optCardOn]}>
                  <Text style={[styles.optText, form.service === s.slug && styles.optTextOn]}>{s.title}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: Spacing.three }]}>Urgency *</Text>
            <View style={styles.optGrid}>
              {URGENCY.map((u) => (
                <Pressable key={u.value} onPress={() => setForm({ ...form, urgency: u.value })} style={[styles.optCard, form.urgency === u.value && styles.optCardOn]}>
                  <Text style={[styles.optText, form.urgency === u.value && styles.optTextOn]}>{u.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: Spacing.three }]}>Location</Text>
            <View style={styles.row}>
              <F label="Address *" value={form.address} set={(v) => setForm({ ...form, address: v })} ph="Street address" />
              <F label="Postcode *" value={form.postcode} set={(v) => setForm({ ...form, postcode: v })} ph="e.g. SW1A 1AA" />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Describe the Issue</Text>
              <TextInput style={[styles.input, styles.textarea]} value={form.issue} onChangeText={(v) => setForm({ ...form, issue: v })} placeholder="Describe the fault..." placeholderTextColor={Brand.textMuted} multiline numberOfLines={4} textAlignVertical="top" />
            </View>

            <Pressable onPress={submit} disabled={sending} style={({ pressed }) => [styles.submit, pressed && styles.submitPressed]}>
              <Text style={styles.submitText}>{sending ? 'Submitting...' : 'Request Booking'}</Text>
            </Pressable>
            <Text style={styles.disclaimer}>We'll call to confirm availability and provide a fixed price quote.</Text>
          </View>
        )}
      </Section>
    </View>
  );
}

function F({ label, value, set, ph, kb }: { label: string; value: string; set: (v: string) => void; ph?: string; kb?: any }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={set} placeholder={ph} placeholderTextColor={Brand.textMuted} keyboardType={kb} autoCapitalize="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.three },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 480 },
  badges: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.two },
  badge: { backgroundColor: Brand.bgCard, borderRadius: 100, paddingHorizontal: Spacing.three, paddingVertical: 6, borderWidth: 1, borderColor: Brand.border },
  badgeText: { color: Brand.white, fontSize: 13, fontWeight: '500' },
  form: { maxWidth: 800, alignSelf: 'center' as any, width: '100%', gap: Spacing.three },
  honeypot: { position: 'absolute', left: -9999, opacity: 0, height: 0 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Brand.white },
  row: { flexDirection: 'row', gap: Spacing.three, flexWrap: 'wrap' as any },
  field: { flex: 1, minWidth: 200, gap: Spacing.one },
  label: { fontSize: 13, fontWeight: '600', color: Brand.textSecondary },
  input: { backgroundColor: Brand.bgCard, borderWidth: 1, borderColor: Brand.border, borderRadius: 8, paddingHorizontal: Spacing.three, height: 48, fontSize: 15, color: Brand.white, outlineStyle: 'none' as any },
  textarea: { height: 120, paddingTop: Spacing.three },
  chips: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.one },
  chip: { paddingHorizontal: Spacing.two, paddingVertical: 6, borderRadius: 100, borderWidth: 1, borderColor: Brand.border, backgroundColor: Brand.bgCard },
  chipOn: { backgroundColor: Brand.orange, borderColor: Brand.orange },
  chipText: { fontSize: 12, color: Brand.textSecondary, fontWeight: '500' },
  chipTextOn: { color: Brand.white },
  optGrid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.two },
  optCard: { flex: 1, minWidth: 150, borderRadius: 8, borderWidth: 1, borderColor: Brand.border, padding: Spacing.three, backgroundColor: Brand.bgCard },
  optCardOn: { borderColor: Brand.orange, backgroundColor: 'rgba(249,115,22,0.1)' },
  optText: { fontSize: 14, fontWeight: '600', color: Brand.textSecondary },
  optTextOn: { color: Brand.orange },
  submit: { backgroundColor: Brand.orange, borderRadius: 8, paddingVertical: Spacing.three, alignItems: 'center', marginTop: Spacing.two },
  submitPressed: { opacity: 0.82 },
  submitText: { color: Brand.white, fontSize: 16, fontWeight: '700' },
  disclaimer: { fontSize: 12, color: Brand.textMuted, textAlign: 'center' as any },
  success: { alignItems: 'center', gap: Spacing.three, padding: Spacing.six },
  successIcon: { fontSize: 56 },
  successTitle: { fontSize: 28, fontWeight: '700', color: Brand.white },
  successText: { fontSize: 16, color: Brand.textSecondary, textAlign: 'center' as any, maxWidth: 480 },
});
