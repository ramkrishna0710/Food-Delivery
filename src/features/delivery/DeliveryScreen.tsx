import { View, Text, Platform, StatusBar } from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useSharedState } from '@features/tabs/SharedContext'
import Graphics from '@components/home/Graphics'
import CustomStatusBar from '@components/statusbar/CustomStatusBar'
import HeaderSection from '@components/home/HeaderSection'
import MainList from '@components/list/MainList'
import { screenWidth } from '@unistyles/Constants'

const DeliveryScreen: FC = () => {

  const insets = useSafeAreaInsets()
  const { styles } = useStyles(homeStyles)
  const { scrollGlobal } = useSharedState()

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollGlobal.value, [1, 50], [0, 1])
    return {
      backgroundColor: `rgba(255,255,255,${opacity})`
    }
  })

  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollGlobal.value,
      [0, 50],
      [0, -50],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ translateY: translateY }]
    }
  })

  const moveUpStyleNotExtrapolate = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollGlobal.value,
      [0, 50],
      [0, -50],
    )
    return {
      transform: [{ translateY: translateY }]
    }
  })

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={'transparent'} translucent /> */}
      <CustomStatusBar/>
      {/* <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }}> */}
      <View>
        <Animated.View style={moveUpStyle}>
          <Animated.View style={moveUpStyleNotExtrapolate}>
            <Graphics />
          </Animated.View>

          <Animated.View style={[backgroundColorChanges, styles.topHeader, { marginTop: Platform.OS === 'android' ? screenWidth * 0.07 : 0 }]}>
            <HeaderSection />
          </Animated.View>
        </Animated.View>

        <Animated.View style={moveUpStyle}>
          <MainList />
        </Animated.View>
      </View>
    </View>
  )
}

export default DeliveryScreen