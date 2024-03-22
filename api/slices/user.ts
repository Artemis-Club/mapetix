import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getUser from "@/api/graphql/queries/user/get.graphql";

const graphqlApi = createApi({
  reducerPath: "graphqlApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/graphql" }),
  endpoints: (builder) => ({
    getMyData: builder.query({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: getUser,
          variables: { id },
        },
      }),
      transformResponse: (response: any) => response.data.myData,
    }),
  }),
});

export const { useGetMyDataQuery } = graphqlApi;
export default graphqlApi;
