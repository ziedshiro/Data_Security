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

const favouriteApi = createApi({
    reducerPath:'Favourites',
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
    tagTypes: ['Favorites'],
    endpoints(builder){
        return{
            fetchFavourite: builder.query<string, void>({
                query: () => {
                    return{
                        url: '/auth/favorite',
                        method: 'GET',
                    };
                },
                providesTags: ['Favorites'],
            }),
            addFavourite: builder.mutation({
                query: (favouriteData) => {
                    return{
                        url: '/auth/favorite',
                        method: 'POST',
                        body:favouriteData
                    };
                },
                invalidatesTags: ['Favorites'],
            }),
            removeFavourite: builder.mutation({
                query: (id) => {
                    return{
                        url: `/auth/favourite/${id}`,
                        method: 'DELETE',
                    };
                },
                invalidatesTags: ['Favorites'],
            }),
        }
    }
})

export const {
    useFetchFavouriteQuery,
    useAddFavouriteMutation,
    useRemoveFavouriteMutation
} = favouriteApi;

export { favouriteApi };
