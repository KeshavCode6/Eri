import React from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { CenteredView, Header1, Header2, Header3, LeftAlignedHeader2, WhiteText } from '@/components/CustomUI';
import { IconButton } from './CustomButton';
import { FontAwesome5 } from '@expo/vector-icons';

interface MemberCardProps {
    pfp: ImageSourcePropType,
    memberUsername: string,
    edit?: boolean,
    onClick?: ()=> void;
}

const MemberCard = ({ pfp, memberUsername, edit }: MemberCardProps) => {
    return (
        <View style={[customStyles.slot, { borderTopWidth: 1 }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={pfp} style={{ borderRadius: 100, width: 30, aspectRatio: "1/1" }} />
                <WhiteText customStyling={{ fontSize: 13 }}>{memberUsername}</WhiteText>
            </View>
            {edit &&
                <View style={{flexDirection:"row"}}>
                    <IconButton customStyling={{ backgroundColor: "orange", shadowColor: "orange" }} size={28} icon={<FontAwesome5 name="car" color={"white"} size={14} />} press={() => { }} />
                    <IconButton customStyling={{ backgroundColor: "red", shadowColor: "red" }} size={28} icon={<FontAwesome5 name="ban" color={"white"} size={14} />} press={() => { }} />
                </View>
            }
        </View>
    )
}

interface MemberCardPropsInvite {
    pfp: ImageSourcePropType,
    memberUsername: string,
    edit?: boolean,
    onClick: ()=> void;
}

export const MemberCardInvited = ({ pfp, memberUsername, onClick }: MemberCardPropsInvite) => {
    return (
        <View style={[customStyles.slot, { borderTopWidth: 1 }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={pfp} style={{ borderRadius: 100, width: 30, aspectRatio: "1/1" }} />
                <View style={{flexDirection:"column", alignItems:"flex-start", marginLeft:10}}>
                    <WhiteText customStyling={{ fontSize: 13 }}>{memberUsername}</WhiteText>
                    <Text style={{color:"gray", fontSize: 10 }}>Pending Acceptance</Text>
                </View>
            </View>
            <IconButton customStyling={{ backgroundColor: "red", shadowColor: "red" }} size={28} icon={<FontAwesome5 name="trash" color={"white"} size={14} />} press={onClick} />
        </View>
    )
}


const customStyles = StyleSheet.create({
    slot: {
        width: "100%",
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomColor: "#242424",
        borderBottomWidth: 1,
        borderTopColor: "#242424",
    }
});

export default MemberCard