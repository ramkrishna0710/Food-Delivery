import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import { cardStyles } from '@unistyles/cardStyles'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import CustomGradient from '@components/global/CustomGradient'
import { recommendedListData } from '@utils/dummyData'

const RecommendedList = () => {

    const { styles } = useStyles(cardStyles)

    // const renderItem = ({ item }: any) => {
    //     return (
    //         <ScalePress
    //             style={styles.itemContainer}
    //             onPress={() => {
    //                 navigate('Resturants', {
    //                     item: item
    //                 })
    //             }}
    //         >
    //             <View style={styles.imageContainer}>
    //                 <Image
    //                     source={{ uri: item?.imageUrl }}
    //                     style={styles.itemImage}
    //                 />
    //                 {
    //                     item?.discount && (
    //                         <View style={styles.discountContainer}>
    //                             <CustomText
    //                                 color={Colors.background}
    //                                 fontSize={10}
    //                                 fontFamily='Okra-Bold'>
    //                                 {item?.discount}
    //                             </CustomText>
    //                             {item?.discountAmount && (
    //                                 <CustomText
    //                                     style={{ lineHeight: 11 }}
    //                                     color={Colors.background}
    //                                     fontSize={9}
    //                                     fontFamily='Okra-Medium'
    //                                 >
    //                                     {item?.discountAmount}
    //                                 </CustomText>
    //                             )}
    //                         </View>
    //                     )
    //                 }

    //                 <TouchableOpacity style={styles.bookmarkIcon}>
    //                     <Image
    //                         style={styles.bookmarkIconImage}
    //                         source={require('@assets/icons/bookmark.png')}
    //                     />
    //                 </TouchableOpacity>

    //                 <CustomGradient position='bottom' />
    //             </View>

    //             <View style={styles.itemInfo}>
    //                 <CustomText
    //                     fontSize={10}
    //                     fontFamily='Okra-Medium'
    //                     color={Colors.text}
    //                     numberOfLines={1}>
    //                     {item?.name}
    //                 </CustomText>
    //                 <View>
    //                     <Image
    //                         source={require('@assets/icons/clock.png')}
    //                         style={styles.clockIcon}
    //                     />
    //                     <CustomText
    //                         fontFamily='Okra-Medium'
    //                         color={Colors.lightText}
    //                         fontSize={9}
    //                         numberOfLines={1}>
    //                         {`${item.time} . ${item?.distance}`}
    //                     </CustomText>
    //                 </View>
    //             </View>
    //         </ScalePress>
    //     )
    // }

    const renderRow = ({ item }: any) => (
        <View style={{ flexDirection: 'column', marginRight: 10 }}>
            {item.map((innerItem: any, index: number) => (
                <ScalePress
                    key={index}
                    style={styles.itemContainer}
                    onPress={() => {
                        navigate('Resturants', { item: innerItem });
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: innerItem?.imageUrl }}
                            style={styles.itemImage}
                        />
                        {innerItem?.discount && (
                            <View style={styles.discountContainer}>
                                <CustomText
                                    color={Colors.background}
                                    fontSize={10}
                                    fontFamily="Okra-Bold"
                                >
                                    {innerItem?.discount}
                                </CustomText>
                                {innerItem?.discountAmount && (
                                    <CustomText
                                        style={{ lineHeight: 11 }}
                                        color={Colors.background}
                                        fontSize={9}
                                        fontFamily="Okra-Medium"
                                    >
                                        {innerItem?.discountAmount}
                                    </CustomText>
                                )}
                            </View>
                        )}

                        <TouchableOpacity style={styles.bookmarkIcon}>
                            <Image
                                style={styles.bookmarkIconImage}
                                source={require('@assets/icons/bookmark.png')}
                            />
                        </TouchableOpacity>

                        <CustomGradient position="bottom" />
                    </View>

                    <View style={styles.itemInfo}>
                        <CustomText
                            fontSize={10}
                            fontFamily="Okra-Medium"
                            color={Colors.text}
                            numberOfLines={1}
                        >
                            {innerItem?.name}
                        </CustomText>
                        <View>
                            <Image
                                source={require('@assets/icons/clock.png')}
                                style={styles.clockIcon}
                            />
                            <CustomText
                                fontFamily="Okra-Medium"
                                color={Colors.lightText}
                                fontSize={9}
                                numberOfLines={1}
                            >
                                {`${innerItem.time} . ${innerItem?.distance}`}
                            </CustomText>
                        </View>
                    </View>
                </ScalePress>
            ))}
        </View>
    )

    const chunkArray = (arr: any[], size: number) => {
        const chunked = []
        for (let i = 0; i < arr.length; i += size) {
            chunked.push(arr.slice(i, i + size))
        }
        return chunked
    }

    const chunkedData = chunkArray(recommendedListData, 2)

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
                horizontal
                data={chunkedData}
                renderItem={renderRow}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                style={styles.recommendedContainer}
            />

        </ScrollView>

    )
}

export default RecommendedList