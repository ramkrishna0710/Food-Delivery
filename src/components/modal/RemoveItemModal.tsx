import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAppSelector } from '@states/reduxHook';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import MiniFoodCard from '@components/resturant/MiniFoodCard';
import { selectRestaurantCartItem } from '@states/reducers/cartSlice';

const RemoveItemModal: FC<{
  item: any;
  restaurant: any;
  onClose: () => void;
}> = ({ item, restaurant, onClose }) => {

  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );

  const { styles } = useStyles(modelStyles);

  useEffect(() => {
    if (!cartItem) {
      onClose();
    }
  }, [cartItem])
  return (
    <View>
      <View style={styles.noShadowHeaderContainer}>
        <View style={styles.flexRowGap}>
          <CustomText fontFamily='Okra-Bold' fontSize={13}>
            Customization for {item?.name}
          </CustomText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles?.scrollContainerWhiteBackground}>
        {
          cartItem?.customizations?.map((cus, index) => {
            return (
              <MiniFoodCard
                item={item}
                cus={cus}
                key={cus?.id}
                restaurant={restaurant}
              />
            )
          })
        }
      </ScrollView>

      <SafeAreaView />
    </View>
  )
}

export default RemoveItemModal