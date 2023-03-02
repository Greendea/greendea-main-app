import { apiSlice } from "./_index";

const TypeName = "Category"
const TypeAPI = "category"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        addCategory: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: [TypeName]
        }),
        updateCategory: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: [TypeName]
        }),
        deleteCategory: builder.mutation({
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

export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = extendedApi;