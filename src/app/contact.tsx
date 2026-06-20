import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '', honeypot: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (form.honeypot) return;
    if (!form.name || !form.email || !form.message) {
      const msg = 'Please fill in all required fields.';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Required', msg);
      return;
    }
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  }

  return (
    <ScrollView style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Home / Contact Us</Text>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.sub}>Get in touch for quotes, enquiries or emergency assistance.</Text>
        </View>
      </View>

      <Section>
        <View style={styles.layout}>
          <View style={styles.formCol}>
            <Text style={styles.colTitle}>Send a Message</Text>
            {sent ? (
              <View style={styles.success}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.successTitle}>Message Sent!</Text>
                <Text style={styles.successText}>We'll reply within 2 hours during business hours.</Text>
              </View>
            ) : (
              <View style={styles.form}>
                <TextInput style={styles.honeypot} value={form.honeypot} onChangeText={(v) => setForm({ ...form, honeypot: v })} tabIndex={-1 as any} aria-hidden />
                <View style={styles.row}>
                  <Field label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Full name" />
                  <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Company" />
                </View>
                <View style={styles.row}>
                  <Field label="Email *" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="email@company.com" keyboard="email-address" />
                  <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="Phone number" keyboard="phone-pad" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Message *</Text>
                  <TextInput style={[styles.input, styles.textarea]} value={form.message} onChangeText={(v) => setForm({ ...form, message: v })} placeholder="Describe your enquiry..." placeholderTextColor={Brand.textMuted} multiline numberOfLines={5} textAlignVertical="top" />
                </View>
                <Pressable onPress={handleSubmit} disabled={sending} style={({ pressed }) => [styles.submit, pressed && styles.submitPressed]}>
                  <Text style={styles.submitText}>{sending ? 'Sending...' : 'Send Message'}</Text>
                </Pressable>
              </View>
            )}
          </View>

          <View style={styles.infoCol}>
            <Text style={styles.colTitle}>Get In Touch</Text>
            <View style={styles.contactCards}>
              {[
                { icon: '📞', label: 'Phone', value: '07745 407 919', note: 'Mon–Fri 8am–6pm, Sat 9am–4pm' },
                { icon: '✉', label: 'Email', value: 'info@advanceddishwasherrepairs.co.uk', note: 'Reply within 2 hours' },
                { icon: '🚨', label: 'Emergency', value: '07745 407 919', note: '24/7 emergency call outs' },
              ].map((c) => (
                <View key={c.label} style={styles.contactCard}>
                  <Text style={styles.cIcon}>{c.icon}</Text>
                  <View style={styles.cBody}>
                    <Text style={styles.cLabel}>{c.label}</Text>
                    <Text style={styles.cValue}>{c.value}</Text>
                    <Text style={styles.cNote}>{c.note}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.hours}>
              <Text style={styles.hoursTitle}>Business Hours</Text>
              {[['Mon – Fri', '8:00am – 6:00pm'], ['Saturday', '9:00am – 4:00pm'], ['Sunday', 'Emergency only']].map(([d, t]) => (
                <View key={d} style={styles.hourRow}>
                  <Text style={styles.hourDay}>{d}</Text>
                  <Text style={styles.hourTime}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Section>
    </ScrollView>
  );
}

function Field({ label, value, onChange, placeholder, keyboard }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; keyboard?: any }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={Brand.textMuted} keyboardType={keyboard} autoCapitalize="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.two },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 480 },
  layout: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.six },
  formCol: { flex: 2, minWidth: 280, gap: Spacing.three },
  colTitle: { fontSize: 22, fontWeight: '700', color: Brand.white },
  form: { gap: Spacing.three },
  honeypot: { position: 'absolute', left: -9999, opacity: 0, height: 0 },
  row: { flexDirection: 'row', gap: Spacing.three, flexWrap: 'wrap' as any },
  field: { flex: 1, minWidth: 180, gap: Spacing.one },
  label: { fontSize: 13, fontWeight: '600', color: Brand.textSecondary },
  input: { backgroundColor: Brand.bgCard, borderWidth: 1, borderColor: Brand.border, borderRadius: 8, paddingHorizontal: Spacing.three, height: 48, fontSize: 15, color: Brand.white, outlineStyle: 'none' as any },
  textarea: { height: 140, paddingTop: Spacing.three },
  submit: { backgroundColor: Brand.orange, borderRadius: 8, paddingVertical: Spacing.three, alignItems: 'center' },
  submitPressed: { opacity: 0.82 },
  submitText: { color: Brand.white, fontSize: 15, fontWeight: '700' },
  success: { alignItems: 'center', gap: Spacing.three, padding: Spacing.five },
  successIcon: { fontSize: 48, color: Brand.success },
  successTitle: { fontSize: 24, fontWeight: '700', color: Brand.white },
  successText: { fontSize: 15, color: Brand.textSecondary, textAlign: 'center' },
  infoCol: { flex: 1, minWidth: 260, gap: Spacing.four },
  contactCards: { gap: Spacing.two },
  contactCard: { flexDirection: 'row', gap: Spacing.two, backgroundColor: Brand.bgCard, borderRadius: 10, padding: Spacing.three, borderWidth: 1, borderColor: Brand.border },
  cIcon: { fontSize: 22, marginTop: 2 },
  cBody: { flex: 1, gap: 2 },
  cLabel: { fontSize: 11, fontWeight: '700', color: Brand.textMuted, textTransform: 'uppercase' as any, letterSpacing: 1 },
  cValue: { fontSize: 14, fontWeight: '600', color: Brand.white },
  cNote: { fontSize: 12, color: Brand.textSecondary },
  hours: { backgroundColor: Brand.bgCard, borderRadius: 10, padding: Spacing.three, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border },
  hoursTitle: { fontSize: 14, fontWeight: '700', color: Brand.orange, marginBottom: Spacing.one },
  hourRow: { flexDirection: 'row', justifyContent: 'space-between' },
  hourDay: { fontSize: 13, color: Brand.textSecondary },
  hourTime: { fontSize: 13, color: Brand.white, fontWeight: '500' },
});
