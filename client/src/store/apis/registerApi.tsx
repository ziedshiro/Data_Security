import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const registerApi = createApi({
    reducerPath:'authen',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/server/api'
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