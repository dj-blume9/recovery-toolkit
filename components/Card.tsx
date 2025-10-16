import { View, ViewStyle } from 'react-native';
import { cardStyles } from '../styles/components/card.styles';

type CardVariant = 'default' | 'elevated' | 'outlined';

type Props = {
    children: React.ReactNode;
    variant?: CardVariant;
    style?: ViewStyle;
};

const Card = ({ children, variant = 'default', style }: Props) => {
    const getCardStyle = () => {
        switch (variant) {
            case 'elevated':
                return cardStyles.cardElevated;
            case 'outlined':
                return cardStyles.cardOutlined;
            default:
                return cardStyles.card;
        }
    };

    return <View style={[getCardStyle(), style]}>{children}</View>;
};

export default Card;
