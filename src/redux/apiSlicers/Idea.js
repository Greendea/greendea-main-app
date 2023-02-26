import { apiSlice } from "./_index";

const TypeName = "Idea"
const TypeAPI = "idea"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIdeas: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        addIdea: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "POST",
                body: item
            }),
            invalidatesTags: [TypeName]
        }),
    }),
    overrideExisting: false,
})

export const { useAddIdeaMutation, useGetIdeasQuery } = extendedApi;