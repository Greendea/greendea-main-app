import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BE_URL + '/api',
    }),
    tagTypes: ["User", "Department", "Term", "Role", "Topic", "Announcement", "Idea", "Category", "Comment"],
    endpoints: () => ({}),
})