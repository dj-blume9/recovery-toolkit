/**
 * @deprecated This file is deprecated. Please use the new theme system instead.
 * 
 * Import from:
 * - Theme tokens: import { colors, spacing, typography } from './theme'
 * - Component styles: import { inputStyles } from './components/input.styles'
 * - Layout styles: import { screenStyles } from './layouts/screen.styles'
 * 
 * See styles/README.md for complete documentation.
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    multiLineTextBox: {
        borderColor: colors.semantic.border,
        borderWidth: 1.5,
        width: '75%',
        minHeight: 150,
        textAlignVertical: 'top',
        padding: spacing.md,
        borderRadius: 8,
        fontSize: typography.fontSize.md,
        color: colors.neutral.charcoal,
    },
    multilineLabelText: {
        maxWidth: '75%',
        ...typography.styles.label,
    },
});

export default styles;