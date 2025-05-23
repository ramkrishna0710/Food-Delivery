import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import RecommendedList from './RecommendedList'
import BreakerText from '@components/ui/BreakerText'
import RegularFoodList from './RegularFoodList'
import { useAppSelector } from '@states/reduxHook'

const ExploreList = () => {

  const [tabSelected, setSeletedTab] = useState(1)
  const { styles } = useStyles(homeStyles)
  const isVegMode = useAppSelector(state => state.user.isVegMode)


  return (
    <View style={styles.topHidingContainer}>
      <View style={[styles.flexRowCenter, {marginTop: 5}]}>
        <Pressable style={[styles.leftTab(tabSelected === 1), {
          borderColor: tabSelected === 1 ? isVegMode ? Colors.active : Colors.primary : Colors.border
        }]} onPress={() => setSeletedTab(1)}>
          <CustomText
            color={tabSelected == 1 ? Colors.text : Colors.lightText}
            fontFamily='Okra-Medium'
          >
            Recommended
          </CustomText>
        </Pressable>

        <Pressable
          style={[styles.rightTab(tabSelected === 2), {
            borderColor: tabSelected == 2 ? isVegMode ? Colors.active : Colors.primary : Colors.border
          }]}
          onPress={() => setSeletedTab(2)}>
          <Icon
            name='bookmark-outline'
            iconFamily='Ionicons'
            color={tabSelected == 2 ? isVegMode ? Colors.active : Colors.primary : Colors.lightText}
            size={14}
          />
          <CustomText
            color={tabSelected == 2 ? Colors.text : Colors.lightText}>
            Collection
          </CustomText>
        </Pressable>
      </View>

      <RecommendedList />
      <BreakerText text="WHAT'S ON YOUR MIND" />
      <RegularFoodList />
      <BreakerText text="ALL RESTURANTS" />
    </View>
  )
}

export default ExploreList