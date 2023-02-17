import { apiSlice } from "./_index";

const TypeName = "Department"
const TypeAPI = "department"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        getDepartmentById: builder.query({
            query: (id) => `${TypeAPI}/${id}`,
            providesTags: [TypeName]
        }),
        addDepartment: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "POST",
                body: item
            }),
            invalidatesTags: [TypeName]
        }),
        updateDepartmentById: builder.mutation({
            query: (item) => ({
                url: `${TypeAPI}/${id}`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: [TypeName]
        }),
        deleteDepartmentById: builder.mutation({
            query: (id) => ({
                url: `${TypeAPI}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TypeName]
        }),

    }),
    overrideExisting: false,
})

export const { useGetDepartmentsQuery, useGetDepartmentByIdQuery, useAddDepartmentMutation, useUpdateDepartmentByIdMutation, useDeleteDepartmentByIdMutation } = extendedApi;