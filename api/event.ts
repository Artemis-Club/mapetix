import { createApi } from '@reduxjs/toolkit/query/react';
import { authBaseQuery } from '@/utils/http';

const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'rest/v1/event',
    }),
    getEventDetail: builder.query({
      query: (id) => `rest/v1/event?plan_id=eq.${id}`,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventDetailQuery } = planApi;
export default planApi;
