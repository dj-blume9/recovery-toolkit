import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSettingsRepo } from "../database/repo/settingsRepo";
import { useEffect, useState } from "react";
import DateTmePicker from "../components/DateTmePicker";
import { toYMDLocal } from "../utils/date";
import Card from "../components/Card";
import { screenStyles } from "../styles/layouts/screen.styles";
import { colors, spacing, typography } from "../styles/theme";

export default function SettingsScreen() {
    const settingRepo = useSettingsRepo();
    const [recoveryStartDate, setRecoveryStartDate] = useState<string | null>(null);

    useEffect(() => {
        async function loadSettings() {
            let rStartDate = await settingRepo.getSetting('recoveryStartDate');
            if (rStartDate != null) {
                setRecoveryStartDate(rStartDate.value);
            }

        }

        loadSettings();
    }, [])

    const updateRecoveryStartDate = async (date: Date) => {
        let convertedDate = toYMDLocal(date);
        const newRecoveryStartDate = convertedDate.toString();
        setRecoveryStartDate(newRecoveryStartDate);
        await settingRepo.updateSetting('recoveryStartDate', newRecoveryStartDate);
    }


    const renderRecoveryStartSetting = () => {
        if (!recoveryStartDate) {
            return (
                <Card variant="elevated" style={styles.settingCard}>
                    <Text style={styles.settingLabel}>Recovery Start Date</Text>
                    <Text style={styles.settingDescription}>
                        Set the date you began your recovery journey. This helps track your progress.
                    </Text>
                    <DateTmePicker label="Select Your Recovery Start Date" date={new Date()} OnChangeDate={updateRecoveryStartDate} />
                </Card>
            )
        } else {
            return (
                <Card variant="elevated" style={styles.settingCard}>
                    <Text style={styles.settingLabel}>Recovery Start Date</Text>
                    <Text style={styles.settingDescription}>
                        Your recovery journey began on:
                    </Text>
                    <View style={styles.dateDisplay}>
                        <Text style={styles.dateText}>{recoveryStartDate}</Text>
                    </View>
                    <DateTmePicker label="Change Date" date={new Date(recoveryStartDate)} OnChangeDate={updateRecoveryStartDate}/>
                </Card>
            )
        }
    };

    return (
        <View style={screenStyles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.subtitle}>
                        Customize your recovery toolkit experience
                    </Text>
                </View>

                {renderRecoveryStartSetting()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: spacing.lg,
        paddingBottom: spacing.xxxl,
    },
    header: {
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.styles.h1,
        color: colors.primary.teal,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.styles.body,
        color: colors.neutral.mediumGray,
        lineHeight: 22,
    },
    settingCard: {
        marginBottom: spacing.md,
    },
    settingLabel: {
        ...typography.styles.h3,
        color: colors.neutral.charcoal,
        marginBottom: spacing.sm,
    },
    settingDescription: {
        ...typography.styles.body,
        color: colors.neutral.mediumGray,
        marginBottom: spacing.md,
        lineHeight: 22,
    },
    dateDisplay: {
        backgroundColor: colors.accent.tealLight,
        padding: spacing.md,
        borderRadius: 8,
        marginBottom: spacing.md,
        alignItems: 'center',
    },
    dateText: {
        ...typography.styles.h2,
        color: colors.primary.teal,
    },
});