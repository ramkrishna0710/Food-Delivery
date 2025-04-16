import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAppSelector } from '@states/reduxHook';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import MiniFoodCard from '@components/resturant/MiniFoodCard';
import { selectRestaurantCartItem } from '@states/reducers/cartSlice';

const RepeatItemModal: FC<{
  item: any;
  restaurant: any;
  onOpenAddModal: () => void;
  onClose: () => void;
}> = ({ item, onOpenAddModal, restaurant, onClose: closeModal }) => {

  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );

  console.log(item);
  
  
  const { styles } = useStyles(modelStyles);

  useEffect(() => {
    if (!cartItem) {
      closeModal();
    }
  }, [cartItem]);

  return (
    <View>
      <View style={styles.noShadowFooterContainer}>
        <View style={styles.flexRowGap}>
          <CustomText fontFamily='Okra-Bold' fontSize={13}>
            Repeat last used customization?
          </CustomText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainerWhiteBackground}>
        {
          cartItem?.customizations?.map((cus, index) => {
            return (
              <MiniFoodCard
                item={item}
                cus={cus}
                key={index}
                restaurant={restaurant}
              />
            )
          })
        }
      </ScrollView>

      <View style={styles.noShadowFooterContainer}>
        <TouchableOpacity onPress={onOpenAddModal}>
          <CustomText
            fontFamily='Okra-Bold'
            color={Colors.active}
            fontSize={11}>
            + add new customisation
          </CustomText>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default RepeatItemModal