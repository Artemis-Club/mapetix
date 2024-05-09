import { createApi } from '@reduxjs/toolkit/query/react';
import { authBaseQuery } from '@/utils/http';

const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'rest/v1/event',
    }),
    getEventDetail: builder.query({
      query: (id) => `rest/v1/event?id=eq.${id}`,
      transformResponse: (response) => response[0],
    }),
  }),
});

export const { useGetEventsQuery, useGetEventDetailQuery } = eventApi;
export default eventApi;
