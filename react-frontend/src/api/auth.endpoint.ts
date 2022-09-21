import { api } from './api';
import { User } from './apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    authUser: builder.query<User, void>({
      query: () => ({ url: 'user/authUser', credentials: 'include' }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthUserQuery } = extendedApi;

// selectors
export const selectAuthUser = () =>
  extendedApi.useAuthUserQuery(undefined, {
    selectFromResult: ({ data }) => ({ authUser: data }),
  });
