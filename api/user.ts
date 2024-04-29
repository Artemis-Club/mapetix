import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/graphql', method: 'POST' }),
  endpoints: (builder) => ({}),
});

export const {} = userApi;
export default userApi;
