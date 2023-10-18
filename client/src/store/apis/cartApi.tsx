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

const cartApi = createApi({
    reducerPath:'Carts',
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
    tagTypes: ['Carts'],
    endpoints(builder){
        return{
            fetchCart: builder.query({
                query: () => {
                    return{
                        url: '/auth/cart',
                        method: 'GET',
                    };
                },
                providesTags: ['Carts'],
            }),
            fetchCartDetail: builder.query({
                query: (id) => {
                    return{
                        url: `/auth/orderitem/${id}`,
                        method: 'GET',
                    };
                },
                providesTags: ['Carts'],
            }),
            addItem: builder.mutation({
                query: ({ id, itemData }) => {
                    return{
                        url: `/auth/orderitem/${id}`,
                        method: 'POST',
                        body:itemData
                    };
                },
                invalidatesTags: ['Carts'],
            }),
            updateItem: builder.mutation({
                query: ({ id, itemData }) => {
                    return{
                        url: `/auth/orderitem/${id}`,
                        method: 'PUT',
                        body:itemData
                    };
                },
                invalidatesTags: ['Carts'],
            }),
            removeItem: builder.mutation({
                query: (id) => {
                    return{
                        url: `/auth/orderitem/${id}`,
                        method: 'DELETE',
                    };
                },
                invalidatesTags: ['Carts'],
            }),
        }
    }
})

export const {
    useAddItemMutation,
    useFetchCartQuery,
    useRemoveItemMutation,
    useUpdateItemMutation
} = cartApi;

export { cartApi };
