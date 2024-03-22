import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getUser from "./graphql/queries/user/getUser.graphql";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/graphql", method: "POST" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: "",
        body: {
          query: getUser,
          variables: { id },
        },
      }),
      transformResponse: (response: any) => response.data.myData,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
export default userApi;
