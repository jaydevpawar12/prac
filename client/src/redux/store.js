import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./api/adminApi";
import { userApi } from "./api/userApi";
import authSlice from "./slice/authSlice";
import { authApi } from "./api/authApi";


const reduxStore = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice
    },
    middleware: defaultMiddleware => [...defaultMiddleware(),
    adminApi.middleware,
    authApi.middleware,
    userApi.middleware,]

})

export default reduxStore