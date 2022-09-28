import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'jiraApiReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Lists', 'Issues', 'Project', 'Members', 'AuthUser'],
  endpoints: (builder) => ({}),
});
