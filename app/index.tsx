import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Card from '../components/Card';
import Button from '../components/Button';
import { screenStyles } from '../styles/layouts/screen.styles';
import { colors, spacing, typography, shadows } from '../styles/theme';

export default function HomeScreen() {
  return (
    <View style={screenStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={styles.welcomeText}>Welcome to your</Text>
          <Text style={styles.appTitle}>Recovery Toolkit</Text>
          <Text style={styles.tagline}>
            Your daily companion for healing and growth
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <Card variant="elevated" style={styles.card}>
            <View style={[styles.cardHeader, { backgroundColor: colors.accent.orangeLight }]}>
              <Text style={styles.cardTitle}>Daily Inventory</Text>
            </View>
            <Text style={styles.cardDescription}>
              Take time to reflect on your day, acknowledge your progress, and identify areas for growth.
            </Text>
            <Link href="/inventory" asChild>
              <Button 
                title="Start Inventory" 
                onPress={() => {}}
                variant="orange"
              />
            </Link>
          </Card>

          <Card variant="elevated" style={styles.card}>
            <View style={[styles.cardHeader, { backgroundColor: colors.accent.greenLight }]}>
              <Text style={styles.cardTitle}>Prayer & Meditation</Text>
            </View>
            <Text style={styles.cardDescription}>
              Connect with your higher power through prayer and quiet reflection.
            </Text>
            <Button 
              title="Coming Soon" 
              onPress={() => {}}
              variant="green"
              disabled
            />
          </Card>

          <Card variant="elevated" style={styles.card}>
            <View style={[styles.cardHeader, { backgroundColor: colors.accent.purpleLight }]}>
              <Text style={styles.cardTitle}>Support Resources</Text>
            </View>
            <Text style={styles.cardDescription}>
              Access helpful resources, meeting information, and emergency contacts.
            </Text>
            <Button 
              title="Coming Soon" 
              onPress={() => {}}
              variant="purple"
              disabled
            />
          </Card>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            "God, grant me the serenity to accept the things I cannot change, courage to change the things I can, and wisdom to know the difference."
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.md,
  },
  welcomeText: {
    ...typography.styles.bodyLarge,
    color: colors.neutral.mediumGray,
  },
  appTitle: {
    ...typography.styles.displayLarge,
    color: colors.primary.teal,
    textAlign: 'center',
    marginVertical: spacing.xs,
  },
  tagline: {
    ...typography.styles.body,
    color: colors.neutral.mediumGray,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.styles.h2,
    marginBottom: spacing.md,
    color: colors.neutral.charcoal,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    marginHorizontal: -spacing.md,
    marginTop: -spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    ...typography.styles.h3,
    color: colors.neutral.charcoal,
  },
  cardDescription: {
    ...typography.styles.body,
    color: colors.neutral.mediumGray,
    marginBottom: spacing.md,
    lineHeight: 24,
  },
  footer: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.accent.tealLight,
    borderRadius: 12,
  },
  footerText: {
    ...typography.styles.body,
    color: colors.neutral.charcoal,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
});
