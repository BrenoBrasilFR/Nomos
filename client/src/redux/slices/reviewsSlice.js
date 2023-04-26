import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const ReviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviews: (state, action) => {
            action.payload.forEach(review => state.push(review))
        },
        addReview: (state, action) => {
            state.push(action.payload)
        }
    },
})

export const { setReviews, addReview } = ReviewsSlice.actions;

export default ReviewsSlice.reducer;