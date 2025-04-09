import { View, Text, Platform, FlatList, Animated } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useStyles } from 'react-native-unistyles';
import { restaurantHeaderStyles } from '@unistyles/restuarantStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import SoringAndFilters from '@components/home/SoringAndFilters';
import { restaurantItemsData, restaurantsItemfiltersOption } from '@utils/dummyData';
import ResturantHeader from '@components/resturant/ResturantHeader';
import DottedLine from '@components/ui/DottedLine';
import FoodCard from './FoodCard';
import CustomStatusBar from '@components/statusbar/CustomStatusBar';
import SearchAndOffers from '@components/resturant/SearchAndOffers';

const ResturantScreen: FC = () => {

  const route = useRoute() as any;
  const resturant = route?.params?.item
  const { styles } = useStyles(restaurantHeaderStyles)
  const insets = useSafeAreaInsets()

  const renderItem = ({ item }: any) => {
    return (
      <FoodCard item={item} resturant={resturant} />
    )
  }

  return (
    <>
      <CustomStatusBar />
      <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
      <CustomSafeAreaView>

        <ResturantHeader title={resturant?.name} />

        <View style={styles.sortingContainer}>
          <SoringAndFilters
            menuTitle='Filter'
            options={restaurantsItemfiltersOption}
          />
        </View>

        <FlatList
          data={restaurantItemsData}
          renderItem={renderItem}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.mainPadding}>
              <DottedLine />
            </View>
          )}
          contentContainerStyle={styles.scrollContainer}
        />

        <SearchAndOffers item={resturant} />
      </CustomSafeAreaView>
    </>
  )
}

export default ResturantScreen