import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../env/utils";

const pause = (duration:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

interface TokenData {
    accessToken: string;
}

const getBearerToken = () => {
    const tokenData = localStorage.getItem('token');
    const token:TokenData | null = tokenData ? JSON.parse(tokenData) : null;
    if (token) {
        return token.accessToken;
    } else {
        return null;
    }
};

const authProductApi = createApi({
    reducerPath:'authProducts',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getBearerToken()}`);
            return headers;
        },
        fetchFn: async (...args) => {
            await pause(2000);
            return fetch(...args)
        },
    }),
    tagTypes: ['Products'],
    endpoints(builder){
        return{
            fetchAuthProduct: builder.query({
                query: () => {
                    return{
                        url: '/auth/product',
                        method: 'GET',
                    };
                },
                providesTags: ['Products'],
            }),
            addProduct: builder.mutation({
                query: (productData) => {
                    return{
                        url: `/auth/product`,
                        method: 'POST',
                        body: productData
                    };
                },
                invalidatesTags: ['Products'],
            }),
            updateProduct: builder.mutation({
                query: ({ id, productData }) => {
                    return{
                        url: `/auth/product/${id}`,
                        method: 'PUT',
                        body:productData
                    };
                },
                invalidatesTags: ['Products'],
            }),
            removeProduct: builder.mutation({
                query: (id) => {
                    return{
                        url: `/auth/product/${id}`,
                        method: 'DELETE',
                    };
                },
                invalidatesTags: ['Products'],
            }),
        }
    }
})

export const {
    useAddProductMutation,
    useFetchAuthProductQuery,
    useRemoveProductMutation,
    useUpdateProductMutation
} = authProductApi;

export { authProductApi };
