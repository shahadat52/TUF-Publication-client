import { baseApi } from "../../api/baseApi";


const noticeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createNotice: builder.mutation({
            query: (noticeData) => ({
                url: "/notice/create-notice",
                method: "POST",
                body: noticeData
            }),
            invalidatesTags: ['notices']
        }),

        getAllNotices: builder.query({
            query: () => ({
                url: '/notice',
                method: 'GET'
            }),
            providesTags: ['notices']
        }),

        getSingleNotice: builder.query({
            query: (id) => {
                return {
                    url: `/notice/${id}`,
                    method: 'GET'
                }
            }
        }),

        lastNotice: builder.query({
            query: () => {
                return {
                    url: `/notice/last-notice`,
                    method: 'GET'
                }
            }
        })
    }),
});

export const { useCreateNoticeMutation, useGetAllNoticesQuery, useGetSingleNoticeQuery, useLastNoticeQuery } = noticeApi