import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './slices/filterSlice';
import authenticationSlice from './slices/authentication';

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        authentication: authenticationSlice,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
