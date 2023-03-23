import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { additionSlice, apiSlice } from './apiSlicers/_index'
import { userSlice } from './user'
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [additionSlice.reducerPath]: additionSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, additionSlice.middleware),
})

export const wrapper = createWrapper(store);
setupListeners(store.dispatch)