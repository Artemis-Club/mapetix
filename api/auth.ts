import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "@/utils/http";
import { ApiResponse, AuthPayload } from "@/types";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiResponse, AuthPayload>({
      query: ({ email, password }) => ({
        url: "auth/v1/signup",
        method: "POST",
        body: { email, password },
      }),
    }),
    login: builder.mutation<ApiResponse, AuthPayload>({
      query: ({ email, password }) => ({
        url: "auth/v1/token?grant_type=password",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
export default authApi;
