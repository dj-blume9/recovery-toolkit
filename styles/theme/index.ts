/**
 * Theme Index
 * Central export for all theme tokens
 */

export { colors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';
export { shadows } from './shadows';
export { borderRadius } from './borderRadius';

// Combined theme object
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';
import { borderRadius } from './borderRadius';

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
} as const;

export type Theme = typeof theme;
