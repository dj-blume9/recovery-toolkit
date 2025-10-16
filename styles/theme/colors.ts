/**
 * Celebrate Recovery Color Palette
 * Centralized color definitions for consistent theming
 */

export const colors = {
  // Core Brand Palette
  primary: {
    teal: '#009FB7',
    green: '#63A60A',
    orange: '#F15A29',
    purple: '#7C3E98',
  },
  
  // Neutral Foundation
  neutral: {
    charcoal: '#1C1C1C',
    white: '#FFFFFF',
    lightGray: '#E6E6E6',
    mediumGray: '#9E9E9E',
  },
  
  // Accent & Supporting Colors
  accent: {
    gold: '#C7A44E',
    tealLight: '#B2E4EA',
    greenLight: '#D2E7B3',
    orangeLight: '#F9C6B1',
    purpleLight: '#D7B6E0',
  },
  
  // Semantic Colors (for consistent usage)
  semantic: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: {
      primary: '#1C1C1C',
      secondary: '#9E9E9E',
      inverse: '#FFFFFF',
    },
    border: '#E6E6E6',
    divider: '#E6E6E6',
    success: '#63A60A',
    warning: '#F15A29',
    info: '#009FB7',
    error: '#F15A29',
  },
} as const;

export type Colors = typeof colors;
