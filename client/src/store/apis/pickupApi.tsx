import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../env/utils";
import Cookies from 'js-cookie';

const pause = (duration:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const pickupApi = createApi({
    reducerPath:'Pickups',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const jwt = Cookies.get('jwt');
            if(jwt){
                headers.set('Authorization', `Bearer ${jwt}`);
            }
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
