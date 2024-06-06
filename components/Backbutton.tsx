import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import COLORS from "@/constants/Colors"
import FontAwesome5 from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

interface CustomButtonProps {
    href: string; // page to go back too
    marginLeft?: DimensionValue;
}

// router.navigate not .push for animation
const Backbutton: React.FC<CustomButtonProps> = ({ href, marginLeft=30}) => {
    return (
        <TouchableOpacity style={{position:"absolute", top:50, left:marginLeft, width:100, height:100}} onPress={()=>{router.navigate(href)}}> 
            <FontAwesome5 name="arrow-left" size={15} color={COLORS.accent}/>
        </TouchableOpacity>
    );
};


export default Backbutton;
