import { View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from './CustomButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from '@/constants/styles';
import { WhiteText } from './CustomUI';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '@/constants/Colors';

interface TimingsPickerProps {
  onChange: (data: { days: boolean[], time: string }) => void;
}

const TimingsPicker: React.FC<TimingsPickerProps> = ({ onChange }) => {
  const [days, setDays] = useState([false, false, false, false, false, false, false]);
  const [time, setTime] = useState(new Date());
  const daysFromIndex = {
    0: "Mon",
    1: "Tues",
    2: "Wed",
    3: "Thurs",
    4: "Fri",
    5: "Sat",
    6: "Sun"
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setTime(selectedDate);
    hideDatePicker();
  };

  const updateDay = (index: number, newValue: boolean) => {
    const newDays = days.map((c, i) => i === index ? newValue : c);
    setDays(newDays);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    onChange({ days, time: formatTime(time) });
  }, [days, time]);

  return (
    <>
      <Pressable
        style={[styles.input, { flexDirection: "row", backgroundColor: "black", height: 36, width: "95%", marginTop: 3, justifyContent: "flex-start", alignItems: "center" }]}
        onPress={showDatePicker}>
        <FontAwesome5 size={15} name="clock" color={COLORS.accent} style={{ marginRight: 10 }} />
        <WhiteText>{formatTime(time)}</WhiteText>
      </Pressable>
      <View style={{ flexDirection: "row", gap: 2, marginTop: 5 }}>
        {days.map((day, index) => (
          <CustomButton
            key={index}
            //@ts-ignore
            title={daysFromIndex[index]}
            press={() => { updateDay(index, !days[index]) }}
            outline={!days[index]}
            customStyling={{ width: 50, height: 30 }}
          />
        ))}
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default TimingsPicker;
