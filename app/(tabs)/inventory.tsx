import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import MultilineTextBox from '../../components/MultilineTextBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function InventoryScreen() {

    return (
        <View>
            <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={120}>
                <MultilineTextBox label='How Am I Feeling Today' />
                <MultilineTextBox label='What Did I Do Right Today?' />
                <MultilineTextBox label='What Did I Do Wrong Today?' />
                <MultilineTextBox label={'Do I Owe Anyone An Amends?\nDo I Need To Offer Forgiveness To Anyone?'} />
                <MultilineTextBox label='If So, How Will I Do It?' />
                <MultilineTextBox label='What Are My Prayer Requests?' />
                <MultilineTextBox label='What Is The Next Action I Need To Take For My Recovery?' />
            </KeyboardAwareScrollView>
        </View>
    );
}