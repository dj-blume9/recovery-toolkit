import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import MultilineTextBox from '../components/MultilineTextBox';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { screenStyles } from '../styles/layouts/screen.styles';
import { colors, spacing, typography } from '../styles/theme';

export default function InventoryScreen() {
    const [responses, setResponses] = useState({
        feelings: '',
        rightActions: '',
        wrongActions: '',
        amendsAndForgiveness: '',
        howToDoIt: '',
        prayerRequests: '',
        nextAction: '',
    });

    const handleSave = () => {
        // TODO: Implement save functionality
        console.log('Saving inventory...', responses);
    };

    const handleClear = () => {
        setResponses({
            feelings: '',
            rightActions: '',
            wrongActions: '',
            amendsAndForgiveness: '',
            howToDoIt: '',
            prayerRequests: '',
            nextAction: '',
        });
    };

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
                <MultilineTextBox 
                    label="How Am I Feeling Today?" 
                    value={responses.feelings}
                    onChangeText={(text) => setResponses({...responses, feelings: text})}
                />
                
                <SectionHeader 
                    title="Daily Actions" 
                    accentColor={colors.primary.green}
                />
                <MultilineTextBox 
                    label="What Did I Do Right Today?" 
                    value={responses.rightActions}
                    onChangeText={(text) => setResponses({...responses, rightActions: text})}
                />
                <MultilineTextBox 
                    label="What Did I Do Wrong Today?" 
                    value={responses.wrongActions}
                    onChangeText={(text) => setResponses({...responses, wrongActions: text})}
                />
                
                <SectionHeader 
                    title="Relationships" 
                    accentColor={colors.primary.orange}
                />
                <MultilineTextBox 
                    label="Do I Owe Anyone An Amends? Do I Need To Offer Forgiveness To Anyone?" 
                    value={responses.amendsAndForgiveness}
                    onChangeText={(text) => setResponses({...responses, amendsAndForgiveness: text})}
                />
                <MultilineTextBox 
                    label="If So, How Will I Do It?" 
                    value={responses.howToDoIt}
                    onChangeText={(text) => setResponses({...responses, howToDoIt: text})}
                />
                
                <SectionHeader 
                    title="Spiritual Growth" 
                    accentColor={colors.primary.purple}
                />
                <MultilineTextBox 
                    label="What Are My Prayer Requests?" 
                    value={responses.prayerRequests}
                    onChangeText={(text) => setResponses({...responses, prayerRequests: text})}
                />
                
                <SectionHeader 
                    title="Next Steps" 
                    accentColor={colors.accent.gold}
                />
                <MultilineTextBox 
                    label="What Is The Next Action I Need To Take For My Recovery?" 
                    value={responses.nextAction}
                    onChangeText={(text) => setResponses({...responses, nextAction: text})}
                />

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
});