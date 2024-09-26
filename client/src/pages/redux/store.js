import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // Ensure this is the correct path
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({ user: userReducer });

// Configure persistence
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Create persistor
export const persistor = persistStore(store);
