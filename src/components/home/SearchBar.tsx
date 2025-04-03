import { View, Text, SafeAreaView, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import { useSharedState } from '@features/tabs/SharedContext';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import RollingContent from 'react-native-rolling-bar'
import CustomText from '@components/global/CustomText';
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import { setVegMode } from '@states/reducers/userSlice';

const searchItems: string[] = [
    '"chai samosa"',
    '"Cake"',
    '"ice cream"',
    '"pizza"',
    '"Chicken Tikka"',
    '"Chicken Curry"',
    '"Chicken Biryani"',
    '"Chicken Masala"',
    '"Chicken Fried Rice"',
    '"Chicken Pasta"',
    '"Chicken Paneer"',
    '"Chicken Bhuna"',
    '"Chicken Tandoori"',
];

const SearchBar: FC = () => {

    const dispatch = useAppDispatch()
    const isVegMode = useAppSelector(state => state.user.isVegMode)
    // const isVegMode = true;
    const { styles } = useStyles(homeStyles)
    const { scrollGlobal } = useSharedState()

    const textColorAnimation = useAnimatedStyle(() => {
        const textColor = interpolate(scrollGlobal.value, [1, 80], [255, 0])
        return {
            color: `rgb(${textColor},${textColor},${textColor})`
        }
    })
    return (
        <>
            <SafeAreaView />
            <View style={[styles.flexRowBetween, styles.padding]}>
                <TouchableOpacity
                    style={styles.searchInputContainer}
                    activeOpacity={0.8}

                >
                    <Icon
                        iconFamily='Ionicons'
                        name='search'
                        color={isVegMode ? Colors.active : Colors.primary}
                        size={20}
                    />

                    <CustomText
                        fontSize={12}
                        fontFamily='Okra-Medium'
                        style={styles.rollingText}
                    >  Search
                    </CustomText>

                    <RollingContent
                        interval={3000}
                        defaultStyle={false}
                        customStyle={styles.textContainer}
                    >
                        {
                            searchItems?.map((item, index) => {
                                return (
                                    <CustomText
                                        fontSize={12}
                                        fontFamily='Okra-Medium'
                                        key={index}
                                        style={styles.rollingText}
                                    >
                                        {item}
                                    </CustomText>
                                )
                            })
                        }
                    </RollingContent>
                    <Icon
                        iconFamily='Ionicons'
                        name='mic-outline'
                        color={isVegMode ? Colors.active : Colors.primary}
                        size={20}
                    />

                </TouchableOpacity>


                <Pressable
                    style={styles.vegMode}
                    onPress={() => dispatch(setVegMode(!isVegMode))}
                >
                    <Animated.Text style={[styles.animatedText, textColorAnimation, { color: 'black' }]}>
                        VEG
                    </Animated.Text>
                    <Animated.Text style={[styles.animatedSubText, textColorAnimation, { color: 'black' }]}>
                        MODE
                    </Animated.Text>
                    <Image
                        source={isVegMode
                            ? require('@assets/icons/switch_on.png')
                            : require('@assets/icons/switch_off.png')
                        }
                        style={styles.switch} />
                </Pressable>

            </View>
        </>
    )
}

export default SearchBar