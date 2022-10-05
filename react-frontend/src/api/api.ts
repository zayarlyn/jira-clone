import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'jiraApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jira-clone.onrender.com/api/',
    credentials: 'include',
  }),
  tagTypes: ['Lists', 'Issues', 'Project', 'Members', 'AuthUser'],
  endpoints: (builder) => ({}),
});
