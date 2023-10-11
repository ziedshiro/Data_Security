import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../utils/baseUrl';

const pause = (duration:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const registerApi = createApi({
    reducerPath:'authen',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        fetchFn: async (...args) => {
            await pause(2000);
            return fetch(...args)
        }
    }),
    endpoints(builder){
        return{
            register: builder.mutation({
                query: (user) => {
                    console.log(user);
                    
                    return{
                        url: '/register',
                        method: 'POST',
                        body:user
                    };
                }
            }),
            MFACode: builder.query({
                query: (userId) => {
                    return{
                        url: `/generateMFACode/${userId}`,
                        method: 'GET',
                    };
                }
            }),
        }
    }
})

export const { 
    useMFACodeQuery,
    useRegisterMutation
 } = registerApi;
export { registerApi };