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
            state.error = false
        },
        loginInSuccess : (state,action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        loginInFailure : (state,action) => {
            state.error = action.payload
            state.loading = false
        },
        logoutSuccess : (state) => {
            state.currentUser = null
            state.error = false
        }
    }
})

export const {loginInFailure,loginInStart,loginInSuccess,logoutSuccess} = userSlice.actions

export default userSlice.reducer 