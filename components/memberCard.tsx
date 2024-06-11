import React from 'react'
import { View, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { CenteredView, Header1, Header2, Header3, LeftAlignedHeader2, WhiteText } from '@/components/CustomUI';
import { IconButton } from './CustomButton';
import { FontAwesome5 } from '@expo/vector-icons';

interface CarpoolCardProps {
    pfp: ImageSourcePropType,
    memberUsername: string,
    edit: boolean,
}

const MemberCard = ({ pfp, memberUsername, edit }: CarpoolCardProps) => {
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