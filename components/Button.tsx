import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { buttonStyles } from '../styles/components/button.styles';
import { colors } from '../styles/theme';

type ButtonVariant = 'teal' | 'green' | 'orange' | 'purple';
type ButtonType = 'primary' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

type Props = {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
};

const Button = ({
    title,
    onPress,
    variant = 'teal',
    type = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
}: Props) => {
    const getButtonStyle = (): ViewStyle[] => {
        const styles: ViewStyle[] = [buttonStyles.button];
        
        if (size === 'small') styles.push(buttonStyles.small as ViewStyle);
        if (size === 'large') styles.push(buttonStyles.large as ViewStyle);
        
        if (type === 'primary') {
            switch (variant) {
                case 'teal':
                    styles.push(buttonStyles.primaryTeal as ViewStyle);
                    break;
                case 'green':
                    styles.push(buttonStyles.primaryGreen as ViewStyle);
                    break;
                case 'orange':
                    styles.push(buttonStyles.primaryOrange as ViewStyle);
                    break;
                case 'purple':
                    styles.push(buttonStyles.primaryPurple as ViewStyle);
                    break;
            }
        } else if (type === 'outlined') {
            switch (variant) {
                case 'teal':
                    styles.push(buttonStyles.outlinedTeal as ViewStyle);
                    break;
                case 'green':
                    styles.push(buttonStyles.outlinedGreen as ViewStyle);
                    break;
            }
        } else if (type === 'text') {
            styles.push(buttonStyles.text as ViewStyle);
        }
        
        if (disabled) styles.push(buttonStyles.disabled as ViewStyle);
        
        return styles;
    };

    const getTextStyle = (): TextStyle => {
        if (type === 'outlined') return buttonStyles.buttonTextOutlined as TextStyle;
        if (type === 'text') return buttonStyles.buttonTextPlain as TextStyle;
        return buttonStyles.buttonText as TextStyle;
    };

    return (
        <TouchableOpacity
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={type === 'primary' ? colors.neutral.white : colors.primary.teal} />
            ) : (
                <Text style={getTextStyle()}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
