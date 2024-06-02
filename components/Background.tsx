import { ImageBackground, StyleSheet, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

interface CustomBackgroundProps {
    children: ReactNode;
    customStyling?: ViewStyle; // Marked as optional
}

const GradientBackground: React.FC<CustomBackgroundProps> = ({ children, customStyling}) => {
    let blueColors = ['#000000', '#1A1A1A', '#282828'];
    
    return (
        <LinearGradient
            colors={blueColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.container,customStyling]}
        >
            {children}
        </LinearGradient>
    )
}

export const LoginImageBackground: React.FC<CustomBackgroundProps> = ({ children, customStyling}) => {
    
    return (
        <ImageBackground resizeMode="cover" source={require("@/assets/background.png")} style={[styles.container,customStyling]}>
            {children}
        </ImageBackground>
    )
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: "center"
    }
})


export default GradientBackground;