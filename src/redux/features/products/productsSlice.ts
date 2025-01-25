import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: ''
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        selectedProduct: (state, action) => {
            state.products = action.payload;
        }
    }

});

export const { selectedProduct } = productsSlice.actions;

export default productsSlice.reducer;