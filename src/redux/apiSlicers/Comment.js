import { apiSlice } from "./_index";

const TypeAPI = "comment"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "POST",
                body: item
            }),
            invalidatesTags: ["Idea", "Comment"]
        }),
        getCommentByIdea: builder.query({
            query: (ideaId) => ({
                url: `${TypeAPI}/${ideaId}`,
                method: "GET",
            }),
            providesTags: ["Comment"]
        }),

    }),
    overrideExisting: false,
})

export const { useAddCommentMutation, useGetCommentByIdeaQuery } = extendedApi;