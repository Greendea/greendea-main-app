import { apiSlice } from "./_index";

const TypeName = "Idea"
const TypeAPI = "idea"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIdeas: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        getPersonalIdeas: builder.query({
            query: () => `${TypeAPI}?personal=true`,
            providesTags: [TypeName]
        }),
        addIdea: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "POST",
                body: item
            }),
            invalidatesTags: [TypeName]
        }),
        updateIdeaStatus: builder.mutation({
            query: (item) => ({
                url: `${TypeAPI}/${item.id}`,
                method: "PUT",
                body: {
                    status: item.status
                }
            }),
            invalidatesTags: [TypeName]
        }),
        upsertReact: builder.mutation({
            query: (item) => ({
                url: "react",
                method: "POST",
                body: item
            }),
            invalidatesTags: ["Idea"],
            // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            //     console.log("argargargargargargarg", arg)
            //     const patchResult = dispatch(
            //         extendedApi.util.updateQueryData("getIdeas", arg, (draft) => {
            //             console.log("CHANGING")
            //             draft = draft.map(i => {
            //                 if (i.id === arg.idea) {
            //                     console.log("***********************************")
            //                     return {
            //                         ...i,
            //                         "reacts": arg.status === 0 ? i.reacts.filter(item => item.userId != arg.userId) : i.reacts.map(item => {
            //                             if (item.userId === arg.userId) {
            //                                 return {
            //                                     userId: item.userId,
            //                                     status: arg.status
            //                                 }
            //                             }
            //                             return item
            //                         })
            //                     }
            //                 }
            //                 return i
            //             })
            //             console.log("update", draft)
            //         })
            //     )
            //     try {
            //         await queryFulfilled
            //     } catch {
            //         console.log("failed")
            //         patchResult.undo()
            //     }

            // },
        }),
    }),
    overrideExisting: false,
})

export const { useAddIdeaMutation, useGetIdeasQuery, useUpdateIdeaStatusMutation, useGetPersonalIdeasQuery, useUpsertReactMutation, endpoints } = extendedApi;