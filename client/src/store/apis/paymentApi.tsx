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

const paymentApi = createApi({
    reducerPath:'Payments',
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
    tagTypes: ['Payments'],
    endpoints(builder){
        return{
            //for admin
            fetchPayment: builder.query({
                query: () => {
                    return{
                        url: '/auth/payment',
                        method: 'GET',
                    };
                },
                providesTags: ['Payments'],
            }),
            //provide user
            generatePromptpayQRCode: builder.mutation({
                query: (id) => {
                    return{
                        url: `/auth/generatepromptpayqrcode/${id}`,
                        method: 'POST',
                    };
                },
            }),
            //for user pay order
            payment: builder.mutation({
                query: (id) => {
                    return{
                        url: `/auth/payment/${id}`,
                        method: 'POST',
                    };
                },
                invalidatesTags: ['Payments'],
            }),
            //for admin change status order
            updateStatusPayment: builder.mutation({
                query: ({ id, orderData }) => {
                    return{
                        url: `/auth/payment/${id}`,
                        method: 'PUT',
                        body:orderData
                    };
                },
                invalidatesTags: ['Payments'],
            }),
        }
    }
})

export const {
    useFetchPaymentQuery,
    useGeneratePromptpayQRCodeMutation,
    usePaymentMutation,
    useUpdateStatusPaymentMutation
} = paymentApi;

export { paymentApi };
