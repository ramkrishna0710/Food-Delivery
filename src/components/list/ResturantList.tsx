import { View, Text, FlatList } from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles'
import { cardStyles } from '@unistyles/cardStyles'
import ResturantCard from './ResturantCard'
import CustomText from '@components/global/CustomText'
import { recommendedListData } from '@utils/dummyData'

const ResturantList: FC = () => {

  const { styles } = useStyles(cardStyles)

  const renderItem = ({ item }: any) => {
    return (
      <ResturantCard item={item} />
    )
  }

  return (
    <View>

      <CustomText
        style={styles.centerText}
        fontFamily='Okra-Bold'
        fontSize={12}>
        7777 returants delivering to you
      </CustomText>
      <CustomText
        style={styles.centerText}
        fontFamily='Okra-Medium'
        fontSize={12}
      >
        FEATURED
      </CustomText>
      <FlatList
        data={recommendedListData}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item?.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center', opacity:0.4 }}>
              <CustomText fontFamily='Okra-Medium' varient='h1'>Made with ❤️</CustomText>
              <CustomText fontFamily='Okra-Medium' varient='h5'>By - Ramkrishna Mandal</CustomText>
            </View>
          )
        }}
      />
    </View>
  )
}

export default ResturantList