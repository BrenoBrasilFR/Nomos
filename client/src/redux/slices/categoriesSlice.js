import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            action.payload.forEach(category => state.push(category))
        }
    },
})

export const { setCategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;