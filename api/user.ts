import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/graphql", method: "POST" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: "",
        body: {
          variables: { id },
        },
      }),
      transformResponse: (response: any) => response.data.myData,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
export default userApi;
