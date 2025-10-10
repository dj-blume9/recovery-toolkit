import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 25
    },
    multiLineTextBox: {
        borderColor: 'black',
        borderWidth: 1,
        width: '75%',
        minHeight: 150,
        textAlignVertical: 'top'
    },
    multilineLabelText: {
        maxWidth: '75%',
        
    },
});

export default styles;