import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, DimensionValue, View } from 'react-native';
import COLORS from "@/constants/Colors"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Card from './Card';

interface CustomButtonProps {
    title?: string; // buttons text
    icon?: ReactNode; // button's icon
    press: () => void; // callback function
    outline?: boolean; // Should button be outlined or solid UI
    customStyling?: ViewStyle; // Extra Styling If needed
    size?:DimensionValue; // Only for icon buttons, idk this might be messy
    fontSize?:number;
    amt?:number;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title = "", icon, press, customStyling = {}, outline, fontSize}) => {
    // picking correct style based on button type
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
                <Text style={[buttonTextStyle, {fontSize:fontSize}]}>{title}</Text>
            ) : null}
        </TouchableOpacity>
    );
};

export const IconButton: React.FC<CustomButtonProps> = ({icon, press, customStyling = {}, amt=-1, size}) => {
    let amtText = amt.toString()
    if(amt>9){
        amtText="9+"
    }
    return (
        <TouchableOpacity style={[{width:size, aspectRatio:"1/1", padding:1}]} onPress={press}>
            <Card width={"100%"} height={"100%"} customStyling={customStyling}>
                {icon}

            </Card>
            {amt >0 && (
                <View style={{position:"absolute", top:-11, right:-5, backgroundColor:"red", borderRadius:100, width:20, aspectRatio:"1/1", padding:4}}>
                    <Text style={{color:"white", alignSelf:"center", fontSize:10, fontWeight:800}}>{amtText}</Text>
                </View>
            )}
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
