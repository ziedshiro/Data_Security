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

const pickupApi = createApi({
    reducerPath:'Pickups',
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
    tagTypes: ['Pickups'],
    endpoints(builder){
        return{
            //for store owner
            fetchPickup: builder.query({
                query: () => {
                    return{
                        url: '/auth/pickup',
                        method: 'GET',
                    };
                },
                providesTags: ['Pickups'],
            }),
            //provide user
            generatePickupQRCode: builder.mutation({
                query: (id) => {
                    return{
                        url: `auth/generatepickupqrcode/${id}`,
                        method: 'POST',
                    };
                },
            }),
            //for store owner change status order
            updateStatusPickup: builder.mutation({
                query: ({ id, orderData }) => {
                    return{
                        url: `/auth/pickup/${id}`,
                        method: 'PUT',
                        body:orderData
                    };
                },
                invalidatesTags: ['Pickups'],
            }),
        }
    }
})

export const {
    useFetchPickupQuery,
    useGeneratePickupQRCodeMutation,
    useUpdateStatusPickupMutation
} = pickupApi;

export { pickupApi };
