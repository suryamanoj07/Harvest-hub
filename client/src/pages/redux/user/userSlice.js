import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: false,
    loading: false,
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginInStart: (state) => {
            state.loading = true;
        },
        loginInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        loginInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
        },
        // New action to update user profile
        updateUser: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload }; // Merge existing user data with new data
        },
    },
});

// Export actions
export const { 
    loginInFailure, 
    loginInStart, 
    loginInSuccess, 
    setUserInfo, 
    clearUserInfo, 
    updateUser 
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
