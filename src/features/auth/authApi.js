import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constant';






export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['User'],

  endpoints: (builder) => ({


    userLogin: builder.mutation({
      query: (data) => ({
        url: '/api/userLogin',
        body: data,
        method: 'POST',
      }),
    }),

    userSigUp: builder.mutation({
      query: (data) => ({
        url: '/api/userSignUp',
        body: data,
        method: 'POST',
      }),
    }),


    getuserOrder: builder.query({
      query: (token) => ({
        url: '/api/getUserOrder',
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['User']
    }),

    getAllUsers: builder.query({
      query: (token) => ({
        url: '/api/allUsers',
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['User']
    }),

    getuserProfile: builder.query({
      query: (token) => ({
        url: '/api/getUserProfile',
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['User']
    }),



    userUpdate: builder.mutation({
      query: (query) => ({
        url: '/api/userUpdate',
        body: {
          shippingAddress: query.body,
          email: query.email,
          fullname: query.fullname
        },
        method: 'PATCH',
        headers: {
          Authorization: query.token
        }
      }),
      invalidatesTags: ['User']
    }),





  }),
})


export const { useUserLoginMutation, useUserSigUpMutation, useUserUpdateMutation, useGetuserOrderQuery, useGetuserProfileQuery, useGetAllUsersQuery } = authApi