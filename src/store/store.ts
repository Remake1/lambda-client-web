import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { injectStore } from '../lib/api';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Inject store into API client to handle 401 logout dispatch
injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
