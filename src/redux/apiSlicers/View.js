import { apiSlice } from "./_index";

const TypeAPI = "view"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addView: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "POST",
                body: item
            }),
            invalidatesTags: ["Idea"]
        }),
    }),
    overrideExisting: true,
})

export const { useAddViewMutation } = extendedApi;