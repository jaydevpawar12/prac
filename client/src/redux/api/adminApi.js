import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/admin" }),
    tagTypes: ["user", "todo"],
    endpoints: (builder) => {
        return {

            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/user",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),
            registerUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/user/register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),
            updateUser: builder.mutation({
                query: userData => {
                    return {
                        url: `/user/update/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),
            deleteUser: builder.mutation({
                query: id => {
                    return {
                        url: `/user/delete/${id}`,
                        method: "DELETE",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),


            getTodo: builder.query({
                query: () => {
                    return {
                        url: "/todo",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),
            registerTodo: builder.mutation({
                query: todoData => {
                    return {
                        url: "/todo/register",
                        method: "POST",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            updateTodo: builder.mutation({
                query: todoData => {
                    return {
                        url: `/todo/update/${todoData._id}`,
                        method: "PUT",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            deleteTodo: builder.mutation({
                query: id => {
                    return {
                        url: `/todo/delete/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["todo"]
            }),



        }
    }
})

export const { useGetTodoQuery,
    useGetUsersQuery,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useRegisterTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation } = adminApi
