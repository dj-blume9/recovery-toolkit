import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import MultilineTextBox from '../components/MultilineTextBox';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { screenStyles } from '../styles/layouts/screen.styles';
import { colors, spacing, typography } from '../styles/theme';
import { DailyInventoryPrompt, useDailyInventoriesRepo } from '../database/repo/dailyInventoriesRepo';
import { Link } from 'expo-router';
import { getTodayDate } from '../utils/helpers';

export default function InventoryScreen() {
    const repo = useDailyInventoriesRepo();
    const [prompts, setPrompts] = useState<DailyInventoryPrompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState<Record<string, string | null>>({});

    useEffect(() => {
        async function loadPrompts() {
            try {
                await repo.ensureDefaultPrompts();
                const allPrompts = await repo.getAllPrompts();
                setPrompts(allPrompts);

                const today = getTodayDate();

                const entries = await repo.getEntryByDate(today);

                const initialResponses: Record<string, string | null> = {};
                allPrompts.forEach(prompt => {
                    Object.entries(entries).forEach((e) => {
                        if (e[1].code == prompt.code) {
                            initialResponses[prompt.code] = e[1].value_text != null ? e[1].value_text : '';
                        }
                    });
                });
                setResponses(initialResponses);
            } catch (error) {
                console.error('Error loading prompts:', error);
            } finally {
                setLoading(false);
            }
        }

        loadPrompts();
    }, []);

    const handleSave = async () => {
        const today = getTodayDate();
        let inventoryId = null;
        inventoryId = await repo.getDailyInventoryId(today);
        if (inventoryId == undefined) {

            const newInventoryId = await repo.upsertDailyInventory(today);
            inventoryId = newInventoryId;
        }

        Object.entries(responses).forEach(async ([code, value]) => {
            await repo.saveAnswerByCode(inventoryId, code, value);
        })
    };

    const handleClear = () => {
        const clearedResponses: Record<string, string> = {};
        prompts.forEach(prompt => {
            clearedResponses[prompt.code] = '';
        });
        setResponses(clearedResponses);
    };

    if (loading) {
        return (
            <View style={[screenStyles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={colors.primary.teal} />
                <Text style={styles.loadingText}>Loading prompts...</Text>
            </View>
        );
    }

    return (
        <View style={screenStyles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={120}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >

                <SectionHeader
                    title="Self-Reflection"
                    accentColor={colors.primary.teal}
                />
                {prompts
                    .filter(p => p.code.startsWith('1_'))
                    .map(prompt => (
                        <MultilineTextBox
                            key={prompt.id}
                            label={prompt.label}
                            value={responses[prompt.code] || ''}
                            onChangeText={(text) => setResponses({ ...responses, [prompt.code]: text })}
                        />
                    ))
                }


                <SectionHeader
                    title="Daily Actions"
                    accentColor={colors.primary.green}
                />
                {prompts
                    .filter(p => p.code.startsWith('2_') || p.code.startsWith('3_'))
                    .map(prompt => (
                        <MultilineTextBox
                            key={prompt.id}
                            label={prompt.label}
                            value={responses[prompt.code] || ''}
                            onChangeText={(text) => setResponses({ ...responses, [prompt.code]: text })}
                        />
                    ))
                }

                <SectionHeader
                    title="Relationships"
                    accentColor={colors.primary.orange}
                />
                {prompts
                    .filter(p => p.code.startsWith('4_') || p.code.startsWith('5_'))
                    .map(prompt => (
                        <MultilineTextBox
                            key={prompt.id}
                            label={prompt.label}
                            value={responses[prompt.code] || ''}
                            onChangeText={(text) => setResponses({ ...responses, [prompt.code]: text })}
                        />
                    ))
                }

                <SectionHeader
                    title="Spiritual Growth"
                    accentColor={colors.primary.purple}
                />
                {prompts
                    .filter(p => p.code.startsWith('6_'))
                    .map(prompt => (
                        <MultilineTextBox
                            key={prompt.id}
                            label={prompt.label}
                            value={responses[prompt.code] || ''}
                            onChangeText={(text) => setResponses({ ...responses, [prompt.code]: text })}
                        />
                    ))
                }

                <SectionHeader
                    title="Next Steps"
                    accentColor={colors.accent.gold}
                />
                {prompts
                    .filter(p => p.code.startsWith('7_'))
                    .map(prompt => (
                        <MultilineTextBox
                            key={prompt.id}
                            label={prompt.label}
                            value={responses[prompt.code] || ''}
                            onChangeText={(text) => setResponses({ ...responses, [prompt.code]: text })}
                        />
                    ))
                }

                <View style={styles.buttonContainer}>
                    <Link href="/" asChild>
                        <Button
                            title="Save Inventory"
                            onPress={handleSave}
                            variant="teal"
                            size="large"
                        />
                    </Link>
                    <Button
                        title="Clear All"
                        onPress={handleClear}
                        variant="teal"
                        type="outlined"
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: spacing.md,
        paddingBottom: spacing.xxxl,
    },
    buttonContainer: {
        marginTop: spacing.lg,
        gap: spacing.md,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: spacing.md,
        fontSize: typography.fontSize.md,
        color: colors.neutral.lightGray,
    },
});