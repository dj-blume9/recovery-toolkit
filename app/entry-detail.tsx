import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { screenStyles } from '../styles/layouts/screen.styles';
import { colors, spacing, typography } from '../styles/theme';
import { useDailyInventoriesRepo } from '../database/repo/dailyInventoriesRepo';
import { formatDateDisplay } from '../utils/helpers';
import { InventoryEntry, InventoryResponse } from '../types/inventory.types';

export default function EntryDetailScreen() {
  const params = useLocalSearchParams();
  const repo = useDailyInventoriesRepo();
  const [entry, setEntry] = useState<InventoryEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntry() {
      const entryId = params.id as string;
      if (!entryId) {
        setLoading(false);
        return;
      }

      try {
        const data = await repo.getEntryById(entryId);
        
        if (data.length === 0) {
          setLoading(false);
          return;
        }

        // Get date from first row
        const date_iso = data[0].date_iso;

        // Build responses array
        const responses: InventoryResponse[] = data.map(row => ({
          promptCode: row.code,
          promptLabel: row.label,
          response: row.value_text ?? ''
        }));

        setEntry({
          id: data[0].id,
          date: date_iso,
          dateDisplay: formatDateDisplay(date_iso),
          responses: responses,
          completedPrompts: 0,
          totalPrompts: 7
        });
      } catch (error) {
        console.error('Error loading entry:', error);
      } finally {
        setLoading(false);
      }
    }

    loadEntry();
  }, [params.id]);

  // Helper function to format dates

  // Group responses by section
  const sections = [
    { name: 'Self-Reflection', color: colors.primary.teal, codes: ['1_'] },
    { name: 'Daily Actions', color: colors.primary.green, codes: ['2_', '3_'] },
    { name: 'Relationships', color: colors.primary.orange, codes: ['4_', '5_'] },
    { name: 'Spiritual Growth', color: colors.primary.purple, codes: ['6_'] },
    { name: 'Next Steps', color: colors.accent.gold, codes: ['7_'] },
  ];

  const getResponsesForSection = (codes: string[]) => {
    if (!entry) return [];
    return entry.responses.filter(r => 
      codes.some(code => r.promptCode.startsWith(code))
    );
  };

  if (loading) {
    return (
      <View style={[screenStyles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary.teal} />
        <Text style={styles.loadingText}>Loading entry...</Text>
      </View>
    );
  }

  if (!entry) {
    return (
      <View style={[screenStyles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Entry not found</Text>
      </View>
    );
  }

  return (
    <View style={screenStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Date Header */}
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{entry.dateDisplay}</Text>
          <Text style={styles.dateSubtext}>{entry.date}</Text>
        </View>

        {/* Render each section */}
        {sections.map((section) => {
          const sectionResponses = getResponsesForSection(section.codes);
          
          return (
            <View key={section.name}>
              <SectionHeader
                title={section.name}
                accentColor={section.color}
              />
              
              {sectionResponses.map((response) => (
                <Card key={response.promptCode} variant="default" style={styles.responseCard}>
                  <Text style={styles.promptLabel}>{response.promptLabel}</Text>
                  {response.response.trim() !== '' ? (
                    <Text style={styles.responseText}>{response.response}</Text>
                  ) : (
                    <Text style={styles.emptyResponse}>No response recorded</Text>
                  )}
                </Card>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.neutral.lightGray,
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    color: colors.neutral.mediumGray,
  },
  dateHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginBottom: spacing.md,
  },
  dateText: {
    ...typography.styles.h2,
    color: colors.primary.teal,
    marginBottom: spacing.xs,
  },
  dateSubtext: {
    ...typography.styles.body,
    color: colors.neutral.mediumGray,
  },
  responseCard: {
    marginBottom: spacing.md,
  },
  promptLabel: {
    ...typography.styles.label,
    color: colors.neutral.charcoal,
    marginBottom: spacing.sm,
  },
  responseText: {
    ...typography.styles.body,
    color: colors.neutral.charcoal,
    lineHeight: 24,
  },
  emptyResponse: {
    ...typography.styles.body,
    color: colors.neutral.mediumGray,
    fontStyle: 'italic',
  },
});