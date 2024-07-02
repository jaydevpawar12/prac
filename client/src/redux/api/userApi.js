import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/todo",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),

        }
    }
})

export const { useGetUsersQuery } = userApi
