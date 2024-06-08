import COLORS from '@/constants/Colors';
import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, View, DimensionValue, TouchableOpacity } from 'react-native';

interface CardProps {
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    children?: ReactNode;
    customStyling?: ViewStyle; // Extra styling
    press?: () => void; // callback function
}

const Card: React.FC<CardProps> = ({ width = "90%", height = "10%", children, customStyling = {} }) => {
    let dimensions = { width: width, height: height }

    return (
        <View style={[styles.card, dimensions, customStyling]}>
            {children}
        </View>
    );
};

export const TouchableCard: React.FC<CardProps> = ({ width = "90%", height = 150, children, customStyling = {}, press}) => {
    return (
        <TouchableOpacity onPress={press} style={{ width: width, height}}>
            <Card width={"100%"} height={"100%"} customStyling={customStyling}>
                {children}
            </Card>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.accent,
        borderRadius: 10,
        shadowColor: COLORS.accent,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 1 },
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Card;
