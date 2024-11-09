import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
    currentUser : null,
    error : false,
    loading : false,
    userInfo: null,
}
=======
    currentUser: null,
    error: false,
    loading: false,
    userInfo: null,
};
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginInStart: (state) => {
            state.loading = true;
            state.error = false;
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
<<<<<<< HEAD
        logoutSuccess : (state) => {
            state.currentUser = null
            state.error = false
        },
=======
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
        },
        updateUser: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
<<<<<<< HEAD
=======
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
            state.error = false;
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5
        }
    }
});

<<<<<<< HEAD
export const {loginInFailure,loginInStart,loginInSuccess,logoutSuccess,updateUser,clearUserInfo,setUserInfo} = userSlice.actions
=======
// Export actions
export const { 
    loginInFailure, 
    loginInStart, 
    loginInSuccess, 
    setUserInfo, 
    clearUserInfo, 
    updateUser, 
    logoutSuccess 
} = userSlice.actions;
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5

// Export the reducer
export default userSlice.reducer;
