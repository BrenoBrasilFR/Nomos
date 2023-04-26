import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'userSession',
    initialState: { user: {}, addresses: [], orders: [], token: "" },
    reducers: {
        setUserInfo: (state, action) => {
            const { fname, lname, email, admin, accessToken, addresses, orders } = action.payload
            const user = { fname, lname, email, admin }
            state.user = user
            state.token = accessToken
            state.addresses = addresses
            state.orders = orders
        },
        removeUser: (state) => {
            state.user = {}
            state.token = ""
            state.addresses = []
            state.orders = []
        },
        addAddress: (state, action) => {
            state.addresses.push(action.payload)
        },
        deleteAddress: (state, action) => {
            const address = state.addresses.find(address => address.id === action.payload.id)
            const index = state.addresses.indexOf(address)
            state.addresses.splice(index, 1);
        },
        addOrder: (state, action) => {
            state.orders.push(action.payload)
        }
    },
})

export const { setUserInfo, removeUser, addAddress, deleteAddress, addOrder } = UserSlice.actions;

export default UserSlice.reducer;