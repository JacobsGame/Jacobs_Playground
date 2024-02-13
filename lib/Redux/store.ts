'use client';

import { configureStore } from '@reduxjs/toolkit';
import couterSlice from './Features/couter/couterSlice';

export const store = configureStore({
    reducer: {
        count: couterSlice
    }
})

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
