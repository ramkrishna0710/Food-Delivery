import { Text, TouchableOpacity, View } from 'react-native'
import React, { FC, memo, useCallback, useRef } from 'react'
import Icon from '@components/global/Icon';
import { useStyles } from 'react-native-unistyles';
import { foodStyles } from '@unistyles/foodStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import ScalePress from '@components/ui/ScalePress';
import { RFValue } from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers'
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import { addItemToCart, removeCustomizableItem, removeItemFromCart, selectRestaurantCartItem } from '@states/reducers/cartSlice';
import CustomModal from '@components/modal/CustomModal';
import AddItemModal from '@components/modal/AddItemModal';
import RepeatItemModal from '@components/modal/RepeatItemModal';
import RemoveItemModal from '@components/modal/RemoveItemModal';

const AddButton: FC<{ item: any; resturant: any }> = ({ item, resturant }) => {
    const dispatch = useAppDispatch();
    const { styles } = useStyles(foodStyles)

    const cart = useAppSelector(
        selectRestaurantCartItem(resturant?.id, item?.id)
    );

    const modalRef = useRef<any>(null);

    const openAddModal = () => {
        modalRef?.current?.openModal(
            <AddItemModal
                item={item}
                onClose={() => modalRef.current?.closeModal()}
                resturant={resturant}
            />
        )
    }

    const openRepeatModal = () => {
        modalRef?.current?.openModal(
            <RepeatItemModal
                item={item}
                onOpenAddModal={openAddModal}
                onClose={() => modalRef.current?.closeModal()}
                restaurant={resturant}
            />
        )
    }

    const openRemoveModal = () => {
        modalRef.current?.openModal(
            <RemoveItemModal
                item={item}
                onClose={() => modalRef.current?.closeModal()}
                restaurant={resturant}
            />
        )
    }

    const addCartHandler = useCallback(() => {
        if (item?.isCustomizable) {
            if (cart != null) {
                openRepeatModal()
                return
            }
            openAddModal()
        } else {
            dispatch(
                addItemToCart({
                    restaurant: resturant,
                    item: { ...item, customizations: [] }
                })
            )
        }
    }, [dispatch, item, resturant, cart])

    const removeCartHandler = useCallback(() => {
        if (item?.isCustomizable) {
            if (item?.isCustomizable) {
                if (cart?.customizations && cart?.customizations?.length > 1) {
                    openRemoveModal();
                    return;
                }
                dispatch(
                    removeCustomizableItem({
                        restaurant_id: resturant?.id,
                        customizationId: cart?.customizations![0]?.id,
                        itemId: item?.id,
                    })
                )
            }
        } else {
            dispatch(
                removeItemFromCart({
                    restaurant_id: resturant?.id,
                    itemId: item?.id
                })
            )
        }
    }, [dispatch, item, resturant, cart])

    return (
        <>
            <CustomModal ref={modalRef} />
            <View style={styles.addButtonContainer(cart !== null)}>
                {
                    cart ? (
                        <View style={styles.selectedContainer}>
                            <ScalePress onPress={removeCartHandler}>
                                <Icon
                                    iconFamily='MaterailCommunityIcons'
                                    color='#fff'
                                    name='minus-thick'
                                    size={RFValue(13)}
                                />
                            </ScalePress>
                            <AnimatedNumbers
                                includeComma={false}
                                animationDuration={300}
                                animateToNumber={cart?.quantity}
                                fontStyle={styles.animatedCount}
                            />
                            <ScalePress onPress={addCartHandler}>
                                <Icon
                                    iconFamily='MaterailCommunityIcons'
                                    color='#fff'
                                    name='plus-thick'
                                    size={RFValue(13)}
                                />
                            </ScalePress>

                        </View>
                    ) : (
                        <TouchableOpacity onPress={addCartHandler} style={styles.noSelectionContainer} activeOpacity={0.6} accessibilityLabel='Add item to cart'>
                            <CustomText fontFamily='Okra-Bold' varient='h5' color={Colors.primary}>ADD</CustomText>
                            <CustomText varient='h5' color={Colors.primary} style={styles.plusSmallIcon}>+</CustomText>
                        </TouchableOpacity>
                    )
                }

            </View >

            {item?.isCustomizable && (
                <CustomText fontFamily='Okra-Medium' style={styles.customizeText}>
                    Customisable
                </CustomText>
            )}

        </>
    )
}

export default memo(AddButton);
