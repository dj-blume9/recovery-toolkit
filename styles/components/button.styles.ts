/**
 * Button Component Styles
 * Various button variants and states
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

export const buttonStyles = StyleSheet.create({
  // Base Button
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...shadows.sm,
  },
  
  // Primary Variants
  primaryTeal: {
    backgroundColor: colors.primary.teal,
  },
  primaryGreen: {
    backgroundColor: colors.primary.green,
  },
  primaryOrange: {
    backgroundColor: colors.primary.orange,
  },
  primaryPurple: {
    backgroundColor: colors.primary.purple,
  },
  
  // Outlined Variants
  outlinedTeal: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary.teal,
  },
  outlinedGreen: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary.green,
  },
  
  // Text Variants
  text: {
    backgroundColor: 'transparent',
    ...shadows.none,
  },
  
  // Button Text
  buttonText: {
    ...typography.styles.label,
    color: colors.neutral.white,
  },
  buttonTextOutlined: {
    ...typography.styles.label,
    color: colors.primary.teal,
  },
  buttonTextPlain: {
    ...typography.styles.label,
    color: colors.primary.teal,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  // Sizes
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
});
