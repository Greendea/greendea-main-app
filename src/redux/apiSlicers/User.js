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
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: 'profile',
                method: 'PUT',
                body: {
                    avatar
                },
            }),
            invalidatesTags: [TypeName]
        }),

    }),
    overrideExisting: false,
})

export const { useGetUsersQuery, useGetUserByEmailQuery, useUpdateUserMutation, useUpdateAvatarMutation, endpoints } = extendedApi;