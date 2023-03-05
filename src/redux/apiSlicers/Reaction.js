import { apiSlice } from "./_index";

const TypeAPI = "react"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        upsertReact: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "POST",
                body: item
            }),
            invalidatesTags: ["Idea"]
        }),
    }),
    overrideExisting: false,
})

export const { useUpsertReactMutation } = extendedApi;