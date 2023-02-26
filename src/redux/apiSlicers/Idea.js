import { apiSlice } from "./_index";

const TypeName = "Idea"
const TypeAPI = "idea"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIdeas: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        getPersonalIdeas: builder.query({
            query: () => `${TypeAPI}?personal=true`,
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
        updateIdeaStatus: builder.mutation({
            query: (item) => ({
                url: `${TypeAPI}/${item.id}`,
                method: "PUT",
                body: {
                    status: item.status
                }
            }),
            invalidatesTags: [TypeName]
        }),
    }),
    overrideExisting: false,
})

export const { useAddIdeaMutation, useGetIdeasQuery, useUpdateIdeaStatusMutation, useGetPersonalIdeasQuery } = extendedApi;