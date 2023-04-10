import { getMailMessageForCordinator } from "../../utils/emailMessage";
import { apiSlice } from "./_index";
import { endpoints as externalService } from "./_index";

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
            invalidatesTags: [TypeName],
            async onQueryStarted({ email_service }, { dispatch, queryFulfilled }) {
                console.log(email_service)
                try {
                    await queryFulfilled
                    if (email_service.recipients.length > 0) {
                        await dispatch(externalService.sendMail.initiate({
                            recipients: email_service.recipients,
                            message_html: getMailMessageForCordinator(email_service),
                            subject: "New Idea Arrived"
                        }))
                    }
                } catch { }
            }
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
            // invalidatesTags: ["Idea"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                console.log("argargargargargargarg", arg)
                const patchResult = dispatch(
                    extendedApi.util.updateQueryData("getIdeas", undefined, (draft) => {
                        return draft.map(i => {
                            if (i.id === arg.idea) {
                                return {
                                    ...i,
                                    "reacts": arg.status === 0 ?
                                        i.reacts.filter(item => item.userId != arg.userId)
                                        :
                                        (
                                            i.reacts.find(item => item.userId === arg.userId)
                                                ?
                                                i.reacts.map(item => {
                                                    if (item.userId === arg.userId) {
                                                        return {
                                                            userId: item.userId,
                                                            status: arg.status
                                                        }
                                                    }
                                                    return item
                                                })
                                                :
                                                [{
                                                    userId: arg.userId,
                                                    status: arg.status
                                                }, ...i.reacts]
                                        )
                                }
                            }
                            return i
                        })
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
    }),
    overrideExisting: false,
})

export const { useAddIdeaMutation, useGetIdeasQuery, useUpdateIdeaStatusMutation, useGetPersonalIdeasQuery, useUpsertReactMutation, endpoints } = extendedApi;