import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth"}),
    tagTypes: ["admin", "user"],
    endpoints: (builder) => {
        return {

            loginUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/user/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data.result))
                    return data
                },
                invalidatesTags: ["user"]
            }),
            logoutUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/user/logout",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("user")
                    return data
                },
                invalidatesTags: ["user"]
            }),

            loginAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/admin/login",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data
                },
                invalidatesTags: ["admin"]
            }),
            logoutAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/admin/logout",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data
                },
                invalidatesTags: ["admin"]
            }),
            registerAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/admin/register",
                        method: "POST",
                        body: adminData
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const { useLoginAdminMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLogoutAdminMutation,
    useRegisterAdminMutation
} = authApi
