import { createSlice } from '@reduxjs/toolkit'
import { TProduct } from '../../../interface/products';
// import type { PayloadAction } from '@reduxjs/toolkit'


interface CartState {
    products: TProduct[];
    address: string
}
const initialState: CartState = {
    products: [],
    address: ''
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log(state, action);
            state?.products?.push(action.payload)

        },
        cartEmpty: (state) => {
            state.products = []
        },
        removeFromCart(state, action) {
            // Remove item by its id
            console.log(action.payload);
            state.products = state.products.filter((item: TProduct) => (item?.productId) !== action.payload);
        },
        saveAddress: (state, action) => {
            state.address = action.payload
        }


    },
})

export const { addToCart, cartEmpty, saveAddress, removeFromCart } = cartSlice.actions


export default cartSlice.reducer