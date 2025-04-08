import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo } from 'react'
import { useStyles } from 'react-native-unistyles'
import { foodStyles } from '@unistyles/foodStyles'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import { Colors } from '@unistyles/Constants'
import AddButton from './AddButton'

const FoodCard: FC<{ item: any, resturant: any }> = ({ item, resturant }) => {

    const { styles } = useStyles(foodStyles)

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Image
                    source={
                        item?.isVeg
                            ? require('@assets/icons/veg.png')
                            : require('@assets/icons/non_veg.png')
                    }
                    style={styles.vegIcon}
                />
                <CustomText fontSize={12} numberOfLines={1} fontFamily='Okra-Medium'>
                    {item?.name}
                </CustomText>
                <CustomText fontSize={10} numberOfLines={2} fontFamily='Okra-Medium'>
                    {item?.description}
                </CustomText>
                <CustomText fontSize={11} numberOfLines={1} fontFamily='Okra-Medium'>
                    ₹{item?.price}
                </CustomText>
                <TouchableOpacity style={styles.addToCollectionContainer}>
                    <Icon
                        name='bookmark-outline'
                        iconFamily='Ionicons'
                        size={16}
                        color={Colors.primary}
                    />
                    <CustomText color='#888' fontFamily='Okra-Medium' fontSize={9.5}>
                        Add to Collection
                    </CustomText>
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <View style={styles.image}>
                    <Image source={{ uri: item?.image}} style={styles.foodImage} />
                    <AddButton item={item} resturant={resturant}/>
                </View>
            </View>

        </View>
    )
}

export default memo(FoodCard)