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
            action.payload.forEach(review => {
                let product = state.find(product => product.id === review.product_id)
                if (product.rating === null) { product.rating = [0, 0] }
                product.rating[0] += review.rating
                product.rating[1] += 1
            })
        }
    },
})

export const { setProducts, productRating } = ProductsSlice.actions;

export default ProductsSlice.reducer;