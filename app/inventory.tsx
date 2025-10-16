import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import MultilineTextBox from '../components/MultilineTextBox';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { screenStyles } from '../styles/layouts/screen.styles';
import { colors, spacing, typography } from '../styles/theme';
import { DailyInventoryPrompt, useDailyInventoriesRepo } from '../database/repo/dailyInventoriesRepo';

export default function InventoryScreen() {
    const repo = useDailyInventoriesRepo();
    const [prompts, setPrompts] = useState<DailyInventoryPrompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState<Record<string, string>>({});

    useEffect(() => {
        async function loadPrompts() {
            try {
                await repo.ensureDefaultPrompts();
                const allPrompts = await repo.getAllPrompts();
                setPrompts(allPrompts);

                const initialResponses: Record<string, string> = {};
                allPrompts.forEach(prompt => {
                    initialResponses[prompt.code] = '';
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

    const handleSave = () => {
        // TODO: Implement save functionality
        console.log('Saving inventory...', responses);
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
                            onChangeText={(text) => setResponses({...responses, [prompt.code]: text})}
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
                            onChangeText={(text) => setResponses({...responses, [prompt.code]: text})}
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
                            onChangeText={(text) => setResponses({...responses, [prompt.code]: text})}
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
                            onChangeText={(text) => setResponses({...responses, [prompt.code]: text})}
                        />
                    ))
                }

                <View style={styles.buttonContainer}>
                    <Button
                        title="Save Inventory"
                        onPress={handleSave}
                        variant="teal"
                        size="large"
                    />
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