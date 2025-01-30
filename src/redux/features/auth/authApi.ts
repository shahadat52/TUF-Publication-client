import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/registration",
                method: "POST",
                body: userInfo
            }),
        }),

        login: builder.mutation({
            query: (userInfo) => ({
                url: '/user/login',
                method: 'POST',
                body: userInfo
            })
        }),

        getSingleUser: builder.query({

            query: (id) => {
                console.log(id);
                return {
                    url: `/user/${id}`,
                    method: 'GET'
                }
            }
        })
    }),
});

export const { useRegisterMutation, useLoginMutation, useGetSingleUserQuery } = authApi