import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme';

export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  label: {
    ...typography.styles.label,
    marginBottom: spacing.sm,
    color: colors.neutral.charcoal,
  },
  input: {
    backgroundColor: colors.neutral.white,
    borderWidth: 1.5,
    borderColor: colors.semantic.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.neutral.charcoal,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: colors.primary.teal,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.semantic.error,
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  helperText: {
    ...typography.styles.caption,
    marginTop: spacing.xs,
    color: colors.neutral.mediumGray,
  },
  errorText: {
    ...typography.styles.caption,
    marginTop: spacing.xs,
    color: colors.semantic.error,
  },
});
