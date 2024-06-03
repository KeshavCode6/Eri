import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import COLORS from "@/constants/Colors"
import FontAwesome5 from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

interface CustomButtonProps {
    href: string; // page to go back too
}

// router.navigate not .push for animation
const Backbutton: React.FC<CustomButtonProps> = ({ href }) => {
    return (
        <TouchableOpacity style={{position:"absolute", top:50, left:30, width:100, height:100}} onPress={()=>{router.navigate(href)}}> 
            <FontAwesome5 name="arrow-left" size={15} color={COLORS.accent}/>
        </TouchableOpacity>
    );
};


export default Backbutton;
