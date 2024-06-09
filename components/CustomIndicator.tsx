import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '@/constants/Colors'

const CustomIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={COLORS.accent} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CustomIndicator
