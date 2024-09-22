import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : false,
    loading : false,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        loginInStart : (state) => {
            state.loading = true;
        },
        loginInSuccess : (state,action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        loginInFailure : (state,action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const {loginInFailure,loginInStart,loginInSuccess} = userSlice.actions

export default userSlice.reducer 