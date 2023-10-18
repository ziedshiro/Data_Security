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

const historyApi = createApi({
    reducerPath:'Historys',
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
    endpoints(builder){
        return{
            //for user ,show order history
            fetchHistory: builder.query({
                query: () => {
                    return{
                        url: '/auth/order',
                        method: 'GET',
                    };
                },
            }),
            //for user ,show modal order detail by order id in history page
            fetchHistoryDetail: builder.query({
                query: (id) => {
                    return{
                        url: `/auth/orderitem/order/${id}`,
                        method: 'GET',
                    };
                },
            }),
           
        }
    }
})

export const {
    useFetchHistoryDetailQuery,
    useFetchHistoryQuery
} = historyApi;

export { historyApi };
