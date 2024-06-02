import COLORS from '@/constants/Colors';
import React, { ReactNode } from 'react';
import {StyleSheet, ViewStyle, View, DimensionValue } from 'react-native';

interface CardProps {
    width?:DimensionValue|undefined;
    height?:DimensionValue|undefined;
    children?:ReactNode;
    customStyling?: ViewStyle; // Marked as optional
}

const Card: React.FC<CardProps> = ({ width="90%", height="10%", children, customStyling = {} }) => {
    let dimensions = {width:width, height:height}

    return (
        <View style={[styles.card, dimensions, customStyling]}>
            {children}
        </View>
    );
};


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
