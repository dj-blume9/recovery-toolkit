import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Card from '../components/Card';
import Button from '../components/Button';
import { screenStyles } from '../styles/layouts/screen.styles';
import { colors, spacing, typography, shadows } from '../styles/theme';
import { InventoryEntry } from '../types/inventory.types';
import { useInventoryHistory } from '../hooks/useInventoryHistory';
import { useInventoryFilter } from '../hooks/useInventoryFilter';
import { useInventoryStats } from '../hooks/useInventoryStats';

export default function HistoryScreen() {
  const router = useRouter();
  const { entries, loading, error } = useInventoryHistory();
  const { selectedFilter, setSelectedFilter, filteredEntries } = useInventoryFilter(entries);
  const stats = useInventoryStats(entries);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={styles.emptyTitle}>No Entries Yet</Text>
      <Text style={styles.emptyDescription}>
        Your completed daily inventories will appear here. Start your first inventory to begin tracking your journey.
      </Text>
      <Link href="/inventory" asChild>
        <Button
          title="Start First Inventory"
          onPress={() => { }}
          variant="teal"
          size="large"
        />
      </Link>
    </View>
  );

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === 'all' && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedFilter('all')}
      >
        <Text
          style={[
            styles.filterButtonText,
            selectedFilter === 'all' && styles.filterButtonTextActive,
          ]}
        >
          All Time
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === 'week' && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedFilter('week')}
      >
        <Text
          style={[
            styles.filterButtonText,
            selectedFilter === 'week' && styles.filterButtonTextActive,
          ]}
        >
          This Week
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === 'month' && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedFilter('month')}
      >
        <Text
          style={[
            styles.filterButtonText,
            selectedFilter === 'month' && styles.filterButtonTextActive,
          ]}
        >
          This Month
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEntry = (entry: InventoryEntry) => {
    const isComplete = entry.completedPrompts === entry.totalPrompts;
    const firstResponse = entry.responses.find(r => r.response.trim() !== '');

    return (
      <TouchableOpacity
        key={entry.id}
        activeOpacity={0.7}
        onPress={() => router.push(`/entry-detail?id=${entry.id}`)}
      >
        <Card variant="elevated" style={styles.entryCard}>
          <View style={styles.entryHeader}>
            <View style={styles.entryHeaderLeft}>
              <Text style={styles.entryDate}>{entry.dateDisplay}</Text>
              <View
                style={[
                  styles.statusBadge,
                  isComplete
                    ? styles.statusBadgeComplete
                    : styles.statusBadgePartial,
                ]}
              >
                <Text style={styles.statusBadgeText}>
                  {entry.completedPrompts}/{entry.totalPrompts} Complete
                </Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>

          {firstResponse && (
            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>{firstResponse.promptLabel}</Text>
              <Text style={styles.entryPreview} numberOfLines={2}>
                {firstResponse.response}
              </Text>
            </View>
          )}

          <View style={styles.promptIndicators}>
            {entry.responses.map((response) => (
              <View
                key={response.promptCode}
                style={[
                  styles.promptDot,
                  response.response.trim() !== ''
                    ? styles.promptDotFilled
                    : styles.promptDotEmpty
                ]}
              />
            ))}
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[screenStyles.container,]}>
        <Text>Loading your journey...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[screenStyles.container]}>
        <Text>Failed to load entries</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={screenStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Journey</Text>
          <Text style={styles.subtitle}>
            Review your daily reflections and track your progress over time
          </Text>
        </View>

        <Card variant="elevated" style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalEntries}</Text>
              <Text style={styles.statLabel}>Total Entries</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.weekEntries}</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </Card>

        {renderFilterButtons()}

        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          {filteredEntries.length === 0 ? (
            renderEmptyState()
          ) : (
            <View style={styles.entriesList}>
              {filteredEntries.map(renderEntry)}
            </View>
          )}
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
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.styles.h1,
    color: colors.primary.teal,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.neutral.mediumGray,
    lineHeight: 22,
  },
  statsCard: {
    marginBottom: spacing.lg,
    backgroundColor: colors.accent.tealLight,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  statNumber: {
    ...typography.styles.h1,
    color: colors.primary.teal,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.styles.bodySmall,
    color: colors.neutral.charcoal,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.primary.teal,
    opacity: 0.3,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  filterButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
    backgroundColor: colors.neutral.white,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.primary.teal,
    borderColor: colors.primary.teal,
  },
  filterButtonText: {
    ...typography.styles.bodySmall,
    color: colors.neutral.mediumGray,
    fontWeight: typography.fontWeight.medium,
  },
  filterButtonTextActive: {
    color: colors.neutral.white,
  },
  entriesSection: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    ...typography.styles.h3,
    color: colors.neutral.charcoal,
    marginBottom: spacing.md,
  },
  entriesList: {
    gap: spacing.md,
  },
  entryCard: {
    marginBottom: 0,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  entryHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  entryDate: {
    ...typography.styles.h4,
    color: colors.neutral.charcoal,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusBadgeComplete: {
    backgroundColor: colors.accent.greenLight,
  },
  statusBadgePartial: {
    backgroundColor: colors.accent.orangeLight,
  },
  statusBadgeText: {
    ...typography.styles.bodySmall,
    color: colors.neutral.charcoal,
    fontWeight: typography.fontWeight.medium,
    fontSize: 11,
  },
  chevron: {
    fontSize: 32,
    color: colors.neutral.lightGray,
    marginLeft: spacing.sm,
  },
  previewSection: {
    marginBottom: spacing.sm,
  },
  previewLabel: {
    ...typography.styles.bodySmall,
    color: colors.primary.teal,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  entryPreview: {
    ...typography.styles.body,
    color: colors.neutral.mediumGray,
    lineHeight: 22,
  },
  promptIndicators: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lightGray,
  },
  promptDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  promptDotFilled: {
    backgroundColor: colors.primary.teal,
  },
  promptDotEmpty: {
    backgroundColor: colors.neutral.lightGray,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.styles.h2,
    color: colors.neutral.charcoal,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    ...typography.styles.body,
    color: colors.neutral.mediumGray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
});
