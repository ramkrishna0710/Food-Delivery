import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '@states/reduxHook';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import { addCustomizableItem } from '@states/reducers/cartSlice';

const AddItemModal: FC<{ item: any; resturant: any; onClose: () => void }> = ({
    item,
    resturant,
    onClose
}) => {

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
        if(data?.quantity > 1) {
            setData(prevData => ({
                ...prevData,
                quantity: prevData?.quantity - 1,
                price: calculatePrice(prevData?.quantity - 1, prevData?.selectedOption),
            }));
        }
    }

    // const addItemIntoCart = async () => {
    //     const customizaionOptions = transformSelectedOptions(
    //         data?.selectedOption,
    //         item?.customizaionOptions,
    //     ).sort((a,b) =>  a.type.localeCompare(b.type))

    //     const customizedData = {
    //         resturant: resturant,
    //         item: item,
    //         customization: {
    //             quantity: data?.quantity,
    //             price: data?.price,
    //             customizaionOptions: customizaionOptions,
    //         }
    //     }
    //     dispatch(addCustomizableItem(customizedData))
    //     onClose()
    // }

    return (
        <View>
            <Text>AddItemModal</Text>
        </View>
    )
}

export default AddItemModal

const styles = StyleSheet.create({})