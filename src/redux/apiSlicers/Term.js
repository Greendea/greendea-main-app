import { apiSlice } from "./_index";

const TypeName = "Term"
const TypeAPI = "term"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTermAndCondition: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        updateTermAndCondition: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: [TypeName]
        }),

    }),
    overrideExisting: false,
})

export const { useGetTermAndConditionQuery, useUpdateTermAndConditionMutation } = extendedApi;