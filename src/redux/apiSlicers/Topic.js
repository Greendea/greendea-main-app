import { apiSlice } from "./_index";

const TypeName = "Topic"
const TypeAPI = "topic"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTopics: builder.query({
            query: () => ({
                url: TypeAPI,
            }),
            providesTags: [TypeName]
        }),
        addTopic: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: [TypeName]
        }),
        updateTopic: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: [TypeName]
        }),
        deleteTopic: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: 'DELETE',
                body: item,
            }),
            invalidatesTags: [TypeName]
        }),
    }),
    overrideExisting: false,
})

export const { useAddTopicMutation, useGetTopicsQuery, useUpdateTopicMutation, useDeleteTopicMutation, endpoints } = extendedApi;