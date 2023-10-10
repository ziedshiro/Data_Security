import { configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./apis/registerApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        [registerApi.reducerPath]: registerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(registerApi.middleware)
    }
})

setupListeners(store.dispatch);

export {
    useMFACodeMutation,
    useRegisterMutation
} from './apis/registerApi'