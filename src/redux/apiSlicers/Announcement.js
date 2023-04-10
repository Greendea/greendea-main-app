import { apiSlice } from "./_index";

const TypeName = "Announcement"
const TypeAPI = "announcement"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAnnouncements: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        addAnnouncement: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "POST",
                body: item
            }),
            invalidatesTags: [TypeName]
        }),
        updateAnnouncementById: builder.mutation({
            query: (item) => ({
                url: `${TypeAPI}/${item.id}`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: [TypeName]
        }),
        deleteAnnouncementById: builder.mutation({
            query: (item) => ({
                url: `${TypeAPI}/${item.id}`,
                method: 'DELETE',
                body: item
            }),
            invalidatesTags: [TypeName]
        }),

    }),
    overrideExisting: false,
})

export const { useGetAnnouncementsQuery, useAddAnnouncementMutation, useUpdateAnnouncementByIdMutation, useDeleteAnnouncementByIdMutation, endpoints } = extendedApi;