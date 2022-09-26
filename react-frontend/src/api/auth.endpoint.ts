import { api } from './api';
import { AuthUser, PublicUser } from './apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    authUser: builder.query<AuthUser, void>({
      query: () => ({ url: 'user/authUser', credentials: 'include' }),
    }),
    publicUser: builder.query<PublicUser, number>({
      query: (id) => ({ url: `user/${id}`, credentials: 'include' }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthUserQuery, usePublicUserQuery } = extendedApi;

// selectors
export const selectAuthUser = () =>
  extendedApi.useAuthUserQuery(undefined, {
    selectFromResult: ({ data }) => ({ authUser: data }),
  });
