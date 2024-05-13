import { createApi } from '@reduxjs/toolkit/query/react';
import { authApiQuery } from '@/utils/http';

const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: authApiQuery,
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'allevents',
    }),
    getEventDetail: builder.query({
      query: (id) => `rest/v1/event?id=eq.${id}`,
      transformResponse: (response) => response[0],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventDetailQuery,
  useLazyGetEventsQuery,
} = eventApi;
export default eventApi;
