import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { v4 as uuid } from 'uuid'


interface CartItem {
    isVeg: boolean;
    id: string;
    name: string;
    price: number;
    quantity: number;
    cartPrice?: number;
    isCustomizable?: boolean;
    customizations?: any[];
}

interface ResturantDeltails {
    id: string;
    name: string;
    discount: string;
    discountAmount: string;
    time: string;
    distance: string;
    rating: number;
    imageUrl: string;
}

interface ResturantCart {
    resturant: ResturantDeltails;
    items: CartItem[];
}

interface CartState {
    carts: ResturantCart[];
}

const initialState: CartState = {
    carts: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (
            state,
            action: PayloadAction<{
                resturant: ResturantDeltails;
                item: CartItem;
            }>
        ) => {
            const { resturant, item } = action.payload
            const existingResturantCart = state.carts.find(cart => cart?.resturant?.id === resturant?.id)
            if (existingResturantCart) {
                const exsitingItem = existingResturantCart?.items?.find(cartItem => cartItem?.id === item?.id)
                if (exsitingItem) {
                    exsitingItem.quantity += 1;
                    exsitingItem.cartPrice = (exsitingItem.cartPrice || 0) + exsitingItem?.price
                } else {
                    existingResturantCart?.items?.push({
                        ...item,
                        quantity: 1,
                        cartPrice: item?.price
                    })
                }
            } else {
                state.carts.push({
                    resturant,
                    items: [{ ...item, quantity: 1, cartPrice: item?.price }]
                })
            }
        },

        removeItemFromCart: (
            state,
            action: PayloadAction<{
                resturant_id: string;
                itemId: string;
            }>
        ) => {
            const { itemId, resturant_id } = action?.payload;
            const resturantCart = state?.carts?.find(
                cart => cart?.resturant?.id === resturant_id,
            )
            if (!resturantCart) return;

            const itemIndex = resturantCart.items?.findIndex(item => item?.id === itemId)

            if (itemIndex !== -1) {
                const item = resturantCart?.items[itemIndex]
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.cartPrice = (item.cartPrice || 0) - item?.price
                } else {
                    resturantCart.items.splice(itemIndex, 1)
                }
            }

            if (resturantCart.items.length === 0) {
                state.carts = state.carts.filter(
                    cart => cart.resturant.id !== resturant_id
                )
            }
        },

        addCustomizableItem: (
            state,
            action: PayloadAction<{
                resturant: ResturantDeltails,
                item: CartItem,
                customization: {
                    quantity: number;
                    price: number;
                    customizationOptions: any[]
                };
            }>
        ) => {
            const { resturant, item, customization: customization } = action.payload;
            const existingRestaurantCart = state.carts.find(
                cart => cart.resturant.id === resturant.id
            );

            if (existingRestaurantCart) {

                const existingItem = existingRestaurantCart?.items?.find(
                    cartItem => cartItem?.id === item?.id
                ) as any;

                if (existingItem) {

                    const existingCustomizationIndex =
                        existingItem?.cusomizations?.findIndex(
                            (cust: any) =>
                                JSON.stringify(cust.customizationOptions) ===
                                JSON.stringify(customization.customizationOptions)
                        )

                    if (
                        existingCustomizationIndex !== undefined &&
                        existingCustomizationIndex !== -1
                    ) {
                        const existingCustomization =
                            existingItem?.customizations[existingCustomizationIndex];
                        existingCustomization.quantity += customization?.quantity;
                        existingCustomization.cartPrice += customization?.price;
                    } else {
                        const newCustomizationId = uuid();
                        existingItem?.customizations?.push({
                            id: newCustomizationId,
                            ...customization,
                            quantity: customization?.quantity,
                            cartPrice: customization?.price,
                            price: customization?.price / customization?.quantity
                        })
                    }

                    existingItem.quantity += customization?.quantity
                    existingItem.cartPrice = (existingItem?.cartPrice || 0) + customization?.price

                } else {
                    const newCustomizationid = `c1`;
                    existingRestaurantCart.items.push({
                        ...item,
                        quantity: customization?.quantity,
                        cartPrice: customization?.price,
                        customizations: [
                            {
                                id: newCustomizationid,
                                ...customization,
                                quantity: customization?.quantity,
                                cartPrice: customization?.price,
                                price: customization.price / customization.quantity
                            }
                        ]
                    })
                }

            } else {
                const newCustomizationid = `c1`;
                state.carts.push({
                    resturant,
                    items: [
                        {
                            ...item,
                            quantity: customization?.quantity,
                            cartPrice: customization?.price,
                            customizations: [
                                {
                                    id: newCustomizationid,
                                    ...customization,
                                    quantity: customization?.quantity,
                                    cartPrice: customization?.price,
                                    price: customization.price / customization.quantity
                                }
                            ]
                        }
                    ]
                })
            }
        },

        removeCustomizableItem: (
            state,
            action: PayloadAction<{
                resturant_id: string;
                itemId: string;
                customizationId: string;
            }>
        ) => {
            const { resturant_id, itemId, customizationId } = action.payload;
            const restaurantCart = state?.carts?.find(
                cart => cart?.resturant?.id === resturant_id,
            );

            if (!restaurantCart) return;

            const item = restaurantCart?.items?.find(
                cartItem => cartItem?.id === itemId,
            );

            if (!item) return;

            const customizationIndex = item?.customizations?.findIndex(
                cust => cust?.id === customizationId,
            ) as number;

            if (customizationIndex !== -1 && item?.customizations) {
                const customization = item.customizations[customizationIndex];
                if (customization?.quantity > 1) {
                    customization.quantity -= 1;
                    customization.cartPrice -= customization?.price;
                } else {
                    item?.customizations?.splice(customizationIndex, 1)
                }

                item.quantity -= 1;
                item.cartPrice = (item?.cartPrice || 0) - customization?.price;

                if (item?.quantity === 0 || item?.customizations?.length === 0) {
                    restaurantCart.items = restaurantCart?.items?.filter(
                        cartItem => cartItem.id !== itemId,
                    )
                }

                if (restaurantCart?.items?.length === 0) {
                    state.carts = state.carts?.filter(
                        cart => cart?.resturant?.id !== resturant_id,
                    )
                }
            }
        },

        updateCustomizableItem: (
            state,
            action: PayloadAction<{
                resturant_id: string;
                itemId: string;
                customizationId: string;
                newCustomization: {
                    quantity: number;
                    price: number;
                    customizaionOptions: any[];
                }
            }>
        ) => {
            const { resturant_id, itemId, customizationId, newCustomization } = action.payload;

            const restaurantCart = state.carts.find(
                cart => cart.resturant.id === resturant_id
            );
            if (!restaurantCart) return;

            const item = restaurantCart.items.find(
                cartItem => cartItem.id === itemId
            );
            if (!item || !item.customizations) return;

            const matchingCustomizationIndex = item?.customizations?.findIndex(
                (cust:any) => 
                    cust?.id !== customizationId && JSON.stringify(cust.customizaionOptions) ===
                JSON.stringify(newCustomization.customizaionOptions)
            )

            const targetCustomizationIndex = item?.customizations?.findIndex(
                cust => cust.id === customizationId
            );
            if(targetCustomizationIndex === -1) return;

            const targetCustomization = item?.customizations[targetCustomizationIndex]

            if(matchingCustomizationIndex !== -1 ) {
                const matchingCustomization = item.customizations[matchingCustomizationIndex]

                matchingCustomization.quantity += newCustomization?.quantity;
                matchingCustomization.cartPrice += newCustomization?.price;

                item?.customizations?.splice(targetCustomizationIndex, 1)
            } else {
                targetCustomization.quantity = newCustomization.quantity;
                targetCustomization.cartPrice = newCustomization.price;
                targetCustomization.price = newCustomization.price / newCustomization.quantity;
                targetCustomization.customizaionOptions = newCustomization.customizaionOptions
            }


            item.quantity = item?.customizations?.reduce(
                (sum, cust) => sum + cust.quantity,
                0
            )
            item.cartPrice = item?.customizations?.reduce(
                (sum, cust) => sum +  cust.cartPrice,
                0
            )

        },


        clearAllCarts: (state) => {
            state.carts = []
        },

        clearResturantCart: (
            state,
            action: PayloadAction<{ resturant_id: string }>
        ) => {
            const { resturant_id } = action.payload
            state.carts = state.carts.filter(cart => cart?.resturant?.id !== resturant_id)
        }
    }
})

export const {
    addItemToCart,
    removeItemFromCart,
    clearAllCarts,
    clearResturantCart,
    addCustomizableItem,
    removeCustomizableItem,
    updateCustomizableItem
} = cartSlice.actions


export const selectCart = (state: RootState) => state.cart;

export const selectResturantCart = (resturantId: string) =>
    createSelector(
        (state: RootState) =>
            state.cart.carts.find(cart => cart.resturant.id === resturantId),
        resturantCart => (resturantCart ? [...resturantCart.items] : []),
    );


export const selectResturantCartItem = (
    resturantId: string,
    itemId: string,
) =>
    createSelector(
        (state: RootState) =>
            state.cart.carts.find(cart => cart.resturant.id === resturantId)?.items,
        items => items?.find(item => item?.id === itemId) || null,
    )

export default cartSlice.reducer