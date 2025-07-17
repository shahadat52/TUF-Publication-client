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
                return {
                    url: `/order/specific/product/order?productId=${productId}`,
                    method: "GET"
                }
            },
            providesTags: ['orders']
        }),

        branchOrders: builder.query({
            query: (email) => {
                return {
                    url: `/order?email=${email}`,
                    method: "GET"
                }
            }
        }),

        deliveryPendingPUBProducts: builder.query({
            query: () => {
                return {
                    url: '/order/delivery/pending/publications',
                    method: 'GET'
                }
            },
            providesTags: ['deliveryPendingProducts']
        }),

        deliveryPendingANUProducts: builder.query({
            query: () => {
                return {
                    url: '/order/delivery/pending/annual',
                    method: 'GET'
                }
            },
            providesTags: ['deliveryPendingProducts']
        }),

        updateDeliveryStatus: builder.mutation({
            query: (status) => {
                return {
                    url: `order/toggle-status/${status?.productId}`,
                    method: "PATCH",
                    body: { newStatus: status?.newStatus }
                }
            },
            invalidatesTags: ['orders', 'annualPrizeOrders', 'publicationOrders', 'deliveryPendingProducts']
        }),

        annualPrizeOrders: builder.query({
            query: ({ startDate, endDate, limit }) => {
                return {
                    url: `/order/annual/prize?startDate=${startDate}&endDate=${endDate}&limit=${limit}`,
                    method: 'GET'
                }
            },
            providesTags: ['annualPrizeOrders']
        }),

        publicationOrders: builder.query({
            query: ({ startDate, endDate, limit }) => {
                return {
                    url: `/order/publication/orders?startDate=${startDate}&endDate=${endDate}&limit=${limit}`,
                    method: 'GET'
                }
            },
            providesTags: ['publicationOrders']
        }),

    }),
});

export const { useOrderPlaceMutation, useGetAllOrdersQuery, useDeliveryPendingPUBProductsQuery, useDeliveryPendingANUProductsQuery, useUpdateStatusMutation, useGetMyOrdersQuery, useLastOrderQuery, useProductOrderDetailsQuery, useBranchOrdersQuery, useUpdateDeliveryStatusMutation, useAnnualPrizeOrdersQuery, usePublicationOrdersQuery } = orderApi;