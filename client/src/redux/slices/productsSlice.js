import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            action.payload.forEach(product => state.push(product))
        },
        productRating: (state, action) => {
            const product = state.find(product => product.id === action.payload.id)
            if (product.rating === null) { product.rating = [0, 0] }
            product.rating[0] += action.payload.rating
            product.rating[1] += 1
        }
    },
})

export const { setProducts, productRating } = ProductsSlice.actions;

export default ProductsSlice.reducer;