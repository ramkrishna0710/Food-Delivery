import { View, Text, Platform } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'

const Graphics = () => {
    const { styles } = useStyles(homeStyles)
    return (
        <View style={styles.lottieContainer}>
            <LottieView
                enableMergePathsAndroidForKitKatAndAbove
                enableSafeModeAndroid
                style={styles.lottie}
                source={require('@assets/animations/event.json')}
                autoPlay
                loop
                // loop={Platform.OS !== 'android'}
                hardwareAccelerationAndroid
            />
        </View>
    )
}

export default Graphics