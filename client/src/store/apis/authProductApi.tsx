import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../env/utils";
import Cookies from "js-cookie";

const jwt = Cookies.get('jwt');

const pause = (duration:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

interface TokenData {
    accessToken: string;
}

const getBearerToken = () => {
    if (jwt) {
        return jwt;
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
                    const product = new FormData();
                    const data = {
                        store:productData.store,
                        type:productData.type,
                        name:productData.name,
                        description:productData.description,
                        expiryDate:productData.expiryDate,
                        price:productData.price,
                        discountPrice:productData.discountPrice,
                        quantityAvailable:productData.quantityAvailable,
                    }
                    // product.append(`store`,  productData.store);
                    // product.append(`type`,  productData.type);
                    // product.append(`name`,  productData.name);
                    // product.append(`description`,  productData.type);
                    // product.append(`expiryDate`,  productData.description);
                    // product.append(`price`,  productData.price);
                    // product.append(`discountPrice`,  productData.discountPrice);
                    // product.append(`quantityAvailable`,  productData.quantityAvailable);
                    product.append(`product`, JSON.stringify(data));
                    product.append(`file`, productData.file);
                    return{
                        url: `/auth/product`,
                        method: 'POST',
                        body: product
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
