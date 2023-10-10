import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const registerApi = createApi({
    reducerPath:'authen',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080'
    }),
    endpoints(builder){
        return{
            register: builder.mutation({
                query: (user) => {
                    return{
                        url: '/server/api/register',
                        method: 'POST',
                        body:user
                    };
                }
            }),
            MFACode: builder.mutation({
                query: (userId) => {
                    return{
                        url: `/server/generateMFACode/${userId}`,
                        method: 'POST',
                    };
                }
            }),
        }
    }
})

export const { 
    useMFACodeMutation,
    useRegisterMutation
 } = registerApi;
export { registerApi };