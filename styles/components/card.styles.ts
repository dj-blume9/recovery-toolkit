/**
 * Card Component Styles
 * Reusable card container styles
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, shadows, borderRadius } from '../theme';

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardElevated: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  cardOutlined: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.semantic.border,
  },
});
