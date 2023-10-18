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

const authStoreApi = createApi({
    reducerPath:'Stores',
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
            fetchStore: builder.query({
                query: () => {
                    return{
                        url: '/auth/store',
                        method: 'GET',
                    };
                },
            }),
        }
    }
})

export const {
    useFetchStoreQuery
} = authStoreApi;

export { authStoreApi };
