import { createSlice } from "@reduxjs/toolkit";

const initialState = { on: false, type: "" }

const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationOn(state, action) {
            state.on = true
            state.type = action.payload.type
        },
        setNotificationOff(state) {
            state.on = false
            state.type = ""
        },
    },
})

export const { setNotificationOn, setNotificationOff } = NotificationSlice.actions;
export default NotificationSlice.reducer;