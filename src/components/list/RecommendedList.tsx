import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import { cardStyles } from '@unistyles/cardStyles'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'

const RecommendedList = () => {

    const { styles } = useStyles(cardStyles)

    const renderItem = ({ item }: any) => {
        return (
            <ScalePress
                style={styles.itemContainer}
                onPress={() => {
                    navigate('Resturants', {
                        item: item
                    })
                }}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item?.imageUrl }}
                        style={styles.itemImage}
                    />
                    {
                        item?.discount && (
                            <View style={styles.discountContainer}>
                                <CustomText
                                    color={Colors.background}
                                    fontSize={10}
                                    fontFamily='Okra-Bold'>
                                    {item?.discount}
                                </CustomText>
                                {item?.discountAmount && (
                                    <CustomText
                                        style={{ lineHeight: 11 }}
                                        color={Colors.background}
                                        fontSize={9}
                                        fontFamily='Okra-Medium'
                                    >
                                        {item?.discountAmount}
                                    </CustomText>
                                )}
                            </View>
                        )
                    }

                    <TouchableOpacity style={styles.bookmarkIcon}>
                        <Image
                            style={styles.bookmarkIconImage}
                            source={require('@assets/icons/bookmark.png')}
                        />
                    </TouchableOpacity>
                </View>
            </ScalePress>
        )
    }
    return (
        <View>
            <Text>RecommendedList</Text>
        </View>
    )
}

export default RecommendedList