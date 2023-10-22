import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../env/utils";
import Cookies from "js-cookie";

const jwt = Cookies.get('jwt')

const pause = (duration:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

interface TokenData {
    accessToken: string | null;
}

const getBearerToken = () => {
    if (jwt) {
        return jwt;
    } else {
        return null;
    }
};

const authStoreApi = createApi({
    reducerPath:'authStores',
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
            fetchAuthStore: builder.query({
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
    useFetchAuthStoreQuery
} = authStoreApi;

export { authStoreApi };
