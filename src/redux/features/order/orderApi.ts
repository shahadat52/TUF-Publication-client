import { baseApi } from "../../api/baseApi";


const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        orderPlace: builder.mutation({
            query: (orderData) => ({
                url: "/order/order-place",
                method: "POST",
                body: orderData
            }),
            invalidatesTags: ['orders']
        }),

        getAllOrders: builder.query({
            query: () => ({
                url: "/order",
                method: "GET"
            }),
            providesTags: ['orders']
        }),

        getMyOrders: builder.query({
            query: (branch) => {
                console.log(branch);
                return {
                    url: `/order/myOrders/${branch}`,
                    method: "GET"
                }
            },
            providesTags: ['orders']
        }),

        updateStatus: builder.mutation({
            query: (status) => ({
                url: `/order/${status}`,
                method: "PUT",
                body: status
            }),
            invalidatesTags: ['orders']
        }),


    }),
});

export const { useOrderPlaceMutation, useGetAllOrdersQuery, useUpdateStatusMutation, useGetMyOrdersQuery } = orderApi;