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
            providesTags: [TypeName]
        }),
        updateDepartmentById: builder.mutation({
            query: (item) => ({
                url: `${TypeAPI}/${item.id}`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: ["TypeName"]
        }),
        // deleteDepartmentById: builder.mutation({
        //     query: (item) => ({
        //         url: `${TypeAPI}/${item.id}`,
        //         method: 'PUT',
        //         body: item,
        //     }),
        //     invalidatesTags: ["TypeName"]
        // }),

    }),
    overrideExisting: false,
})

export const { useGetDepartmentsQuery, useGetDepartmentByIdQuery, useAddDepartmentMutation, useUpdateDepartmentByIdMutation } = extendedApi;