import { apiSlice } from "./_index";

const TypeName = "Role"
const TypeAPI = "role"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
    }),
    overrideExisting: false,
})

export const { useGetRolesQuery, endpoints } = extendedApi;