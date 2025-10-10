import { View, Text, TextInput, ScrollView } from 'react-native'
import { useState, useRef } from 'react'
import styles from '../styles/generics'

type Props = {
    label: string
}

const MultilineTextBox = (props: Props) => {
    const [text, setText] = useState('Insert Text Here');
    return (
        <View style={styles.container}>
            <Text style={styles.multilineLabelText}>{props.label}</Text>
            <TextInput
                editable
                multiline
                numberOfLines={4}
                onChangeText={value => setText(value)}
                placeholder={text}
                style={styles.multiLineTextBox}
            />
        </View>
    )
}

export default MultilineTextBox