import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '@states/reduxHook';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import { addCustomizableItem } from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import DottedLine from '@components/ui/DottedLine';
import ScalePress from '@components/ui/ScalePress';
import { RFValue } from 'react-native-responsive-fontsize';
import AnimatedNumber from 'react-native-animated-numbers';
import { SafeAreaView } from 'react-native-safe-area-context';



function transformSelectedOptions(
    selectedOption: any,
    customizaionOptions: any,
) {
    return Object.entries(selectedOption).map(([type, index]) => {
        const customization = customizaionOptions?.find(
            (option: any) => option.type === type
        );
        if (!customization || !customization?.options[index as number]) {
            throw new Error(`Invalid customization type or index for ${type}`)
        }
        return {
            type,
            selectedOption: customization?.options[index as number]
        }
    })
}

const AddItemModal: FC<{ item: any; resturant: any; onClose: () => void }> = ({
    item,
    resturant,
    onClose
}) => {

    // console.log(item);


    const dispatch = useAppDispatch()
    const { styles } = useStyles(modelStyles)
    const [data, setData] = useState({
        quantity: 1,
        price: item?.price,
        selectedOption: {} as Record<string, number>
    });

    useEffect(() => {
        const defaultSelectionOption: Record<string, number> = {}
        let initialPrice = item?.price || 0
        item?.customizaionOptions?.forEach((customization: any) => {
            if (customization?.required) {
                const defaultOptionIndex = customization?.options?.findIndex(
                    (options: any) => options?.price === 0
                );
                if (defaultOptionIndex !== -1) {
                    defaultSelectionOption[customization.type] = defaultOptionIndex
                    initialPrice += customization?.options[defaultOptionIndex]?.price || 0;
                }
            }
        });

        setData(prevData => ({
            ...prevData,
            selectedOption: defaultSelectionOption,
            price: initialPrice
        }));

    }, [item])

    const calculatePrice = (
        quantity: number,
        selectedOption: Record<string, number>,
    ) => {
        const basePrice = item?.price || 0;
        let customizaionPrice = 0;

        Object.keys(selectedOption).forEach(type => {
            const optionIndex = selectedOption[type];
            const optionPrice = item?.customizaionOptions?.find((c: any) => c.type === type)
                ?.options?.[optionIndex]?.price || 0;
            customizaionPrice += optionPrice;
        })
        return (basePrice + customizaionPrice) * quantity;
    }

    const selectOptionHandler = (type: string, index: number) => {
        setData(prevData => {
            const updatedSelectedOption = { ...prevData.selectedOption, [type]: index };
            const updatedPrice = calculatePrice(
                prevData?.quantity,
                updatedSelectedOption,
            );
            return {
                ...prevData,
                selectedOption: updatedSelectedOption,
                price: updatedPrice
            }
        })
    }

    const addCartHandler = () => {
        if (data?.quantity > 1) {
            setData(prevData => ({
                ...prevData,
                quantity: prevData?.quantity + 1,
                price: calculatePrice(prevData?.quantity + 1, prevData?.selectedOption),
            }));
        } else {
            onClose()
        }
    }

    const removeCartHandler = () => {
        if (data?.quantity > 1) {
            setData(prevData => ({
                ...prevData,
                quantity: prevData?.quantity - 1,
                price: calculatePrice(prevData?.quantity - 1, prevData?.selectedOption),
            }));
        }
    }

    const addItemIntoCart = async () => {
        const customizaionOptions = transformSelectedOptions(
            data?.selectedOption,
            item?.customizaionOptions,
        ).sort((a, b) => a.type.localeCompare(b.type))

        const customizedData = {
            resturant: resturant,
            item: item,
            customization: {
                quantity: data?.quantity,
                price: data?.price,
                customizaionOptions: customizaionOptions,
            }
        }
        dispatch(addCustomizableItem(customizedData))
        onClose()
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.flexRowGap}>
                    <Image source={{ uri: item?.image }} style={styles.headerImage} />
                    <CustomText fontFamily='Okra-Medium' fontSize={12}>
                        {item?.name}
                    </CustomText>
                </View>

                <View style={styles.flexRowGap}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon
                            name='bookmark-outline'
                            iconFamily='Ionicons'
                            color={Colors.primary}
                            size={16}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon
                            name='share-outline'
                            iconFamily='Ionicons'
                            color={Colors.primary}
                            size={16}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {item?.customizationOptions?.map((customization: any, index: number) => {
                    return (
                        <View style={styles.subContainer} key={index}>
                            <CustomText fontFamily='Okra-Medium'>
                                {customization?.type}
                            </CustomText>
                            <CustomText fontFamily='Okra-Medium' varient='h7' color='#888'>
                                {customization?.required
                                    ? `Required . Select any 1 option`
                                    : `Add on your ${customization?.type}`
                                }
                            </CustomText>
                            <DottedLine />
                            {
                                customization?.options?.map((option: any, i: number) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            style={styles.optionContainer}
                                            onPress={() => {
                                                selectOptionHandler(customization?.type, i)
                                            }}
                                        >
                                            <CustomText fontFamily='Okra-Medium' fontSize={11}>
                                                {option?.name}
                                            </CustomText>
                                            <View style={styles.flexRowGap}>
                                                <CustomText fontSize={11} fontFamily='Okra-Medium'>
                                                    ₹{option?.price}
                                                </CustomText>
                                                <Icon
                                                    name={
                                                        data?.selectedOption[customization?.type] === i
                                                            ? 'radiobox-marked'
                                                            : 'radiobox-blank'
                                                    }
                                                    iconFamily='MaterailCommunityIcons'
                                                    color={
                                                        data?.selectedOption[customization.type] === i
                                                            ? Colors.active
                                                            : '#888'
                                                    }
                                                    size={16}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    )
                })}
            </ScrollView>

            <View style={styles.footerContainer}>
                <View style={styles.selectedContainer}>
                    <ScalePress onPress={removeCartHandler}>
                        <Icon
                            name='minus-thick'
                            iconFamily='MaterailCommunityIcons'
                            color={Colors.active}
                            size={RFValue(13)}
                        />
                    </ScalePress>
                    <AnimatedNumber
                        includeComma={false}
                        animationDuration={300}
                        animateToNumber={data?.quantity}
                        fontStyle={styles.animatedCount}
                    />
                    <ScalePress onPress={addCartHandler}>
                        <Icon
                            name='plus-thick'
                            iconFamily='MaterailCommunityIcons'
                            size={RFValue(13)}
                            color={Colors.active}
                        />
                    </ScalePress>
                </View>

                <TouchableOpacity
                    style={styles.addButtonContainer}
                    onPress={addItemIntoCart}>
                    <CustomText color='#fff' fontFamily='Okra-Medium' varient='h5'>
                        Add item - ₹{data?.price}
                    </CustomText>
                </TouchableOpacity>
                <SafeAreaView />
            </View>
        </View>
    )
}

export default AddItemModal

const styles = StyleSheet.create({})