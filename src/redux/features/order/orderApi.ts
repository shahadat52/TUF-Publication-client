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
            query: ({ startDate, endDate }) => ({
                url: `/order?startDate=${startDate}&endDate=${endDate}`,
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

        lastOrder: builder.query({
            query: () => {
                return {
                    url: "/order/lastOrder/invoice",
                    method: "GET"
                }
            },
            providesTags: ['orders']
        }),

        productOrderDetails: builder.query({
            query: (productId) => {
                console.log(productId);
                return {
                    url: `/order/specific/product/order?productId=${productId}`,
                    method: "GET"
                }
            },
            providesTags: ['orders']
        }),
    }),
});

export const { useOrderPlaceMutation, useGetAllOrdersQuery, useUpdateStatusMutation, useGetMyOrdersQuery, useLastOrderQuery, useProductOrderDetailsQuery } = orderApi;