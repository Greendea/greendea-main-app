import { apiSlice } from "./_index";

const TypeName = "User"
const TypeAPI = "user"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        getUserByEmail: builder.query({
            query: (email) => {
                console.log("EMAIL", email)
                return `${TypeAPI}/${email}`
            },
            providesTags: [TypeName]
        }),
        updateUser: builder.mutation({
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

export const { useGetUsersQuery, useGetUserByEmailQuery, useUpdateUserMutation, endpoints } = extendedApi;