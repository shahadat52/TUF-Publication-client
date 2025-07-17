import { createSlice } from '@reduxjs/toolkit'
import { TProduct } from '../../../interface/products';
// import type { PayloadAction } from '@reduxjs/toolkit'


interface CartState {
    items: TProduct[];
    address: string
}
const initialState: CartState = {
    items: [],
    address: ''
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            state?.items?.push(action.payload)
        },
        cartEmpty: (state) => {
            state.items = []
        },
        removeFromCart(state, action) {
            // Remove item by its id
            state.items = state.items.filter((item: TProduct) => (item?.productId) !== action.payload);
        },
        saveAddress: (state, action) => {
            state.address = action.payload
        }


    },
})

export const { addToCart, cartEmpty, saveAddress, removeFromCart } = cartSlice.actions


export default cartSlice.reducer