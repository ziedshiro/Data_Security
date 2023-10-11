import { configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./apis/registerApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { loginReducer } from "./slices/loginSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        [registerApi.reducerPath]: registerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(registerApi.middleware)
    }
})

setupListeners(store.dispatch);

export {
    useMFACodeQuery,
    useRegisterMutation
} from './apis/registerApi';

export { userLogin } from './thunks/userLogin';