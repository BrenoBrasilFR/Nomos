import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/cartSlice'
import NotificationSlice from './slices/notificationSlice'
import ProductsSlice from './slices/productsSlice'
import CategoriesSlice from './slices/categoriesSlice'
import ReviewsSlice from './slices/reviewsSlice'
import UserSlice from './slices/userSlice'

export const Store = configureStore({
    reducer: {
        cart: CartSlice,
        notification: NotificationSlice,
        products: ProductsSlice,
        tags: CategoriesSlice,
        reviews: ReviewsSlice,
        userSession: UserSlice,
    }
})