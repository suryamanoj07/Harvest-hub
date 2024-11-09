import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : false,
    loading : false,
    userInfo: null,
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
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
        },
        updateUser: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
        }
    }
})

export const {loginInFailure,loginInStart,loginInSuccess,logoutSuccess,updateUser,clearUserInfo,setUserInfo} = userSlice.actions

export default userSlice.reducer 