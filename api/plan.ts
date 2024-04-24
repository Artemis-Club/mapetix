import { createApi } from '@reduxjs/toolkit/query/react';
import { authBaseQuery } from '@/utils/http';

const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getMyPlans: builder.query({
      query: () => 'rest/v1/plan',
    }),
    getPlanDetails: builder.query({
      query: (id) =>
        `rest/v1/plan?plan_id=eq.${id}&select=*,plan_event(event(*))`,
    }),
  }),
});

export const { useGetMyPlansQuery, useGetPlanDetailsQuery } = planApi;
export default planApi;
