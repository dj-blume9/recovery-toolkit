import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.semantic.surface,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  contentContainerLarge: {
    padding: spacing.lg,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semantic.background,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.semantic.divider,
    marginVertical: spacing.md,
  },
});
