import { createSlice } from '@reduxjs/toolkit'
import { endpoints } from './apiSlicers/User'
const initialState = {
    id: null,
    name: null,
    status: null,
    image: null,
    role: null,
    department: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(endpoints.getUserByEmail.matchFulfilled, (state, { payload }) => {
            state.id = payload.id
            state.name = payload.name
            state.status = payload.status
            state.image = payload.image
            state.role = payload.Role
            state.department = payload.Department
        })
    }
})

// export const {  } = userSlice.actions

export default userSlice.reducer