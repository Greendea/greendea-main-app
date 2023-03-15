import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { apiSlice } from './apiSlicers/_index'
import { userSlice } from './user'
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export const wrapper = createWrapper(store);
setupListeners(store.dispatch)