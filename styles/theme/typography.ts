/**
 * Typography System
 * Consistent text styles across the application
 */

import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  
  // Font Weights
  fontWeight: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Text Styles
  styles: {
    displayLarge: {
      fontSize: 40,
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: 48,
      color: colors.neutral.charcoal,
    },
    h1: {
      fontSize: 32,
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: 40,
      color: colors.neutral.charcoal,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: 32,
      color: colors.neutral.charcoal,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: 28,
      color: colors.neutral.charcoal,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: 24,
      color: colors.neutral.charcoal,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: 28,
      color: colors.neutral.charcoal,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: 24,
      color: colors.neutral.charcoal,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: 20,
      color: colors.neutral.charcoal,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: 16,
      color: colors.neutral.mediumGray,
    },
    label: {
      fontSize: 16,
      fontWeight: '500' as TextStyle['fontWeight'],
      lineHeight: 24,
      color: colors.neutral.charcoal,
    },
    labelSmall: {
      fontSize: 14,
      fontWeight: '500' as TextStyle['fontWeight'],
      lineHeight: 20,
      color: colors.neutral.charcoal,
    },
  },
} as const;

export type Typography = typeof typography;
