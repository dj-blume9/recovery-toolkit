import { View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { inputStyles } from '../styles/components/input.styles';

type Props = {
    label: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
}

const MultilineTextBox = (props: Props) => {
    const [text, setText] = useState(props.value || '');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setText(props.value || '');
    }, [props.value]);

    const handleChangeText = (value: string) => {
        setText(value);
        if (props.onChangeText) {
            props.onChangeText(value);
        }
    };

    return (
        <View style={inputStyles.container}>
            <Text style={inputStyles.label}>{props.label}</Text>
            <TextInput
                editable
                multiline
                numberOfLines={6}
                onChangeText={handleChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={props.placeholder || 'Enter your thoughts here...'}
                placeholderTextColor="#9E9E9E"
                value={text}
                style={[
                    inputStyles.input,
                    inputStyles.multilineInput,
                    isFocused && inputStyles.inputFocused
                ]}
            />
        </View>
    );
};

export default MultilineTextBox;