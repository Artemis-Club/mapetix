import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "@/utils/http";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/signup",
        method: "POST",
        body: { email, password },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/token?grant_type=password",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
export default authApi;
