import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { colors, spacing, typography, shadows } from '../styles/theme';

type Props = {
    label: string;
    date: Date;
    OnChangeDate?: (date: Date) => void;
}

const DateTmePicker = (props: Props) => {
    const [date, setDate] = useState(props.date);
    const [open, setOpen] = useState(false);

    const OnDateSelected = (event: DateTimePickerEvent) => {
        const newDate = new Date(event.nativeEvent.timestamp);
        setDate(newDate);
        setOpen(false);
        if (props.OnChangeDate) {
            props.OnChangeDate(newDate);
        }

    }

    return (
        <View>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => setOpen(true)}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>{props.label}</Text>
            </TouchableOpacity>
            {open && (
                <DateTimePicker
                    value={new Date(date)}
                    mode="date"
                    display="spinner"
                    onChange={OnDateSelected}
                />
            )
            }
        </View>
    )
}

export default DateTmePicker

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary.teal,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.sm,
    },
    buttonText: {
        ...typography.styles.label,
        color: colors.neutral.white,
    },
})