import { getMailMessageForIdeaCreator } from "../../utils/emailMessage";
import { apiSlice } from "./_index";
import { endpoints as externalService } from "./_index";

const TypeAPI = "comment"

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "POST",
                body: item
            }),
            invalidatesTags: ["Idea", "Comment"],
            async onQueryStarted({ email_service }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    if (email_service.recipients.length > 0) {
                        await dispatch(externalService.sendMail.initiate({
                            recipients: email_service.recipients,
                            message_html: getMailMessageForIdeaCreator(email_service),
                            subject: "New comment for your idea"
                        }))
                    }
                } catch {
                    console.log("failt to sent email")
                }
            }
        }),
        getCommentByIdea: builder.query({
            query: (ideaId) => ({
                url: `${TypeAPI}/${ideaId}`,
                method: "GET",
            }),
            providesTags: ["Comment"]
        }),
        deleteComment: builder.mutation({
            query: (item) => ({
                url: TypeAPI,
                method: "DELETE",
                body: item
            }),
            invalidatesTags: ["Idea", "Comment"],
        }),

    }),
    overrideExisting: true,
})

export const { useAddCommentMutation, useGetCommentByIdeaQuery, useDeleteCommentMutation } = extendedApi;