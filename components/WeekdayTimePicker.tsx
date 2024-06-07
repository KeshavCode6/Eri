import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import COLORS from '@/constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '@/constants/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { WhiteText } from './CustomUI';

const WeekdayTimePicker = () => {
    const [date, setDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                presentationStyle='pageSheet'
                onRequestClose={() => setModalVisible(false)}>
                <View style={customStyles.modalBackground}>
                    <DateTimePicker mode="time" display="clock" value={date} />


                </View>
            </Modal>
            <Pressable
                style={[styles.input, {flexDirection:"row", backgroundColor: "black", height: 36, width:"95%", marginTop:3, justifyContent: "flex-start", alignItems: "center" }]}
                onPress={() => setModalVisible(true)}>
                <FontAwesome5 size={15} name="clock" color={COLORS.accent} style={{ marginRight: 10 }} />
                <WhiteText>Edit Timings</WhiteText>
            </Pressable>
        </View>
    )
}

const customStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'black', // Change this to your desired color
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default WeekdayTimePicker;
