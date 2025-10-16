# Styling Architecture

This directory contains a professional, scalable styling system for the Recovery Toolkit application, built with Celebrate Recovery branding.

## Directory Structure

```
styles/
├── theme/                  # Design tokens and theme configuration
│   ├── colors.ts          # Color palette (CR brand colors)
│   ├── spacing.ts         # Spacing scale (8px base unit)
│   ├── typography.ts      # Text styles and font system
│   ├── shadows.ts         # Elevation and shadow styles
│   ├── borderRadius.ts    # Border radius scale
│   └── index.ts           # Theme exports
├── components/            # Component-specific styles
│   ├── button.styles.ts   # Button variants and states
│   ├── card.styles.ts     # Card container styles
│   └── input.styles.ts    # Form input styles
├── layouts/               # Layout and screen styles
│   └── screen.styles.ts   # Common screen layouts
└── README.md             # This file
```

## Design System

### Color Palette

The application uses the Celebrate Recovery brand colors:

**Core Brand Colors:**
- **CR Teal** (`#009FB7`) - Primary CTAs, headers, Guide 1 theme
- **CR Green** (`#63A60A`) - Secondary buttons, progress, Guide 2 theme
- **CR Orange** (`#F15A29`) - Alerts, highlights, Guide 3 theme
- **CR Purple** (`#7C3E98`) - Accents, section headers, Guide 4 theme

**Neutral Foundation:**
- **CR Charcoal** (`#1C1C1C`) - Primary text
- **CR White** (`#FFFFFF`) - Backgrounds
- **CR Light Gray** (`#E6E6E6`) - Borders, dividers
- **CR Medium Gray** (`#9E9E9E`) - Secondary text

**Accent Colors:**
- **CR Gold** (`#C7A44E`) - Special highlights
- Light variants for hover/pressed states

### Spacing System

Based on an 8px grid system:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `xxl`: 48px
- `xxxl`: 64px

### Typography

Consistent text styles for all UI elements:
- Display Large (40px)
- Headings (h1-h4)
- Body text (large, regular, small)
- Labels and captions

### Shadows

Five elevation levels for depth:
- `none`: No shadow
- `sm`: Subtle elevation
- `md`: Card elevation
- `lg`: Modal elevation
- `xl`: Maximum elevation

## Usage

### Importing Theme Tokens

```typescript
import { colors, spacing, typography, shadows, borderRadius } from '../styles/theme';
```

### Using Component Styles

```typescript
import { buttonStyles } from '../styles/components/button.styles';
import { inputStyles } from '../styles/components/input.styles';
import { cardStyles } from '../styles/components/card.styles';
```

### Using Layout Styles

```typescript
import { screenStyles } from '../styles/layouts/screen.styles';
```

### Example: Creating a Custom Component

```typescript
import { StyleSheet } from 'react-native';
import { colors, spacing, typography, shadows } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
    padding: spacing.md,
    ...shadows.sm,
  },
  title: {
    ...typography.styles.h2,
    color: colors.primary.teal,
    marginBottom: spacing.sm,
  },
});
```

## Components

### Button
Variants: `teal`, `green`, `orange`, `purple`
Types: `primary`, `outlined`, `text`
Sizes: `small`, `medium`, `large`

### Card
Variants: `default`, `elevated`, `outlined`

### MultilineTextBox
Styled text input with label, focus states, and proper spacing

### SectionHeader
Colored accent bar with title and optional subtitle

## Best Practices

1. **Always use theme tokens** instead of hardcoded values
2. **Use semantic color names** (e.g., `colors.semantic.text.primary`)
3. **Follow the 8px spacing grid** for consistency
4. **Leverage component styles** for common patterns
5. **Use spread operators** to compose styles from theme tokens

## Extending the System

To add new styles:

1. **New theme tokens**: Add to appropriate file in `theme/`
2. **New component styles**: Create new file in `components/`
3. **New layouts**: Add to `layouts/`
4. **Update this README** with new patterns

## Migration Notes

The old `generics.ts` file has been deprecated in favor of this modular system. Components should be updated to use the new theme-based approach for better maintainability and consistency.
