import { TProduct } from "../../../interface/products";
import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData: TProduct) => ({
                url: "/products/create-products",
                method: "POST",
                body: productData
            }),
            invalidatesTags: ['products']
        }),

        getProducts: builder.query({
            query: (searchTerm) => {
                console.log(searchTerm);
                return {

                    url: "/products",
                    method: "GET",
                    params: searchTerm
                }
            },
            providesTags: ["products"]
        }),

        getSingleProduct: builder.query({
            query: (id: string) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
        }),

        deleteSingleProduct: builder.mutation({
            query: (productId: string) => (
                {

                    url: `/products/${productId}`,
                    method: "DELETE",
                }),
            invalidatesTags: ["products"]
        }),
    }),
});

export const { useGetProductsQuery, useGetSingleProductQuery, useCreateProductMutation, useDeleteSingleProductMutation } = productsApi;
