import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  quantityItems: 0,
  shippingAddress: {
    name: "",
    street: "",
    city: "",
    postalCode: "",
    country: ""
  },
  paymentMethod: ""
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push({
        details: action.payload.details,
        quantity: action.payload.quantity

      })
      state.quantityItems += action.payload.quantity
    },
    removeProduct: (state, action) => {
      const item = state.items.find(item => item.details.id === action.payload.id)
      const index = state.items.indexOf(item)
      const quantity = state.items[index].quantity
      state.items.splice(index, 1)
      state.quantityItems -= quantity
    },
    setProductQnt: (state, action) => {
      const item = state.items.find(item => item.details.id === action.payload.id)
      const index = state.items.indexOf(item)
      state.items[index].quantity += action.payload.quantity
      if (state.items[index].quantity === 0) {
        state.items.splice(index, 1)
      }
      state.quantityItems += action.payload.quantity
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress.name = action.payload.name
      state.shippingAddress.street = action.payload.street
      state.shippingAddress.city = action.payload.city
      state.shippingAddress.postalCode = action.payload.postalCode
      state.shippingAddress.country = action.payload.country

    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload.paymentMethod
    },
    resetCart: (state) => {
      state.items = [];
      state.quantityItems = 0;
    }
  },
})

export const { addProduct, removeProduct, setProductQnt, setShippingAddress, setPaymentMethod, resetCart } = CartSlice.actions

export default CartSlice.reducer