import { View, Text, TouchableOpacity } from "react-native";
import { useSettingsRepo } from "../database/repo/settingsRepo";
import { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SettingsScreen() {
    const settingRepo = useSettingsRepo();
    const [recoveryStartDate, setRecoveryStartDate] = useState<string | null>(null);
    const [displayRecoveryCalendar, setDisplayRecoveryCalendar] = useState(false);

    useEffect(() => {
        async function loadSettings() {
            let rStartDate = await settingRepo.getSetting('recoveryStartDate');
            if (rStartDate != null) {
                setRecoveryStartDate(rStartDate.value);
            }

        }

        loadSettings();
    }, [])


    const renderRecoveryStartSetting = () => {
        if (!recoveryStartDate) {
            return (
                <View>
                    <TouchableOpacity onPress={() => setDisplayRecoveryCalendar(true)}><Text>Add Recovery Start Date</Text></TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    };

    return (
        <View>
            {renderRecoveryStartSetting()}
            {
                displayRecoveryCalendar ?
                <DateTimePicker value={new Date()} mode="date" /> :
                null
            }
        </View>
    )
}