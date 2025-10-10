
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function InventoryScreen() {
    const [text, onChangeText] = useState('Insert Text Here');

    return (
            <SafeAreaView style={{flex: 1}}>
                <Text>How Am I Feeling Today?</Text>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    onChangeText={value => onChangeText(value)}
                    value={text}
                />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
