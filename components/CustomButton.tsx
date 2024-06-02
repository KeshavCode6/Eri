import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import COLORS from "@/constants/Colors"
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface CustomButtonProps {
    title?: string;
    icon?: ReactNode;
    press: () => void;
    outline?: boolean;
    customStyling?: ViewStyle; // Marked as optional
}

const CustomButton: React.FC<CustomButtonProps> = ({ title = "", icon, press, customStyling = {}, outline }) => {
    let buttonStyle = styles.button;
    let buttonTextStyle = styles.buttonText;

    if(outline){
        buttonStyle = styles.buttonOutline;
        buttonTextStyle = styles.buttonOutlineText;
    }
    return (
        <TouchableOpacity style={[buttonStyle, customStyling]} onPress={press}>
            {icon}
            {title.length > 0 ? (
                <Text style={buttonTextStyle}>{title}</Text>
            ) : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.accent,
        borderRadius: 10,
        width: 250,
        height: 40,
        shadowColor:COLORS.accent,
        shadowRadius: 1,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 1 },
        justifyContent: "center",
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "black",
        borderColor:COLORS.accent,
        borderRadius: 10,
        borderWidth:1,
        shadowColor:COLORS.accent,
        width: 250,
        height: 40,
        shadowRadius: 1,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 1 },
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    buttonOutlineText: {
        color: COLORS.accent,
        fontSize: 16
    }
});

export default CustomButton;
