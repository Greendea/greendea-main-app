import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BE_URL + 'api',
    }),
    tagTypes: ["User", "Department", "Term", "Role", "Topic", "Announcement", "Idea", "Category", "Comment"],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: () => ({}),
})


export const additionSlice = createApi({
    reducerPath: 'api_support',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BE_URL_EXTERNAL,
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        sendMail: builder.mutation({
            query: (item) => ({
                url: "send-email",
                method: 'POST',
                body: item,
            }),
        }),
        activeUser: builder.mutation({
            query: (email) => ({
                url: `active_email?email=${email}`,
                method: 'POST',
            }),
        }),
        getOnlineUsers: builder.query({
            query: () => ({
                url: "users",
                method: 'GET',
            }),
        }),
    }),
})

export const { useActiveUserMutation, useGetOnlineUsersQuery, useSendMailMutation, endpoints } = additionSlice;