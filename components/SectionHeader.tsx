import { View, Text, StyleSheet } from 'react-native';
import { typography, colors, spacing } from '../styles/theme';

type Props = {
    title: string;
    subtitle?: string;
    accentColor?: string;
};

const SectionHeader = ({ title, subtitle, accentColor = colors.primary.teal }: Props) => {
    return (
        <View style={styles.container}>
            <View style={[styles.accent, { backgroundColor: accentColor }]} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    accent: {
        width: 4,
        height: '100%',
        borderRadius: 2,
        marginRight: spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        ...typography.styles.h3,
    },
    subtitle: {
        ...typography.styles.bodySmall,
        color: colors.neutral.mediumGray,
        marginTop: spacing.xs,
    },
});

export default SectionHeader;
