import { api } from '../api';
import { AuthUser, PublicUser, updateAuthUser } from '../apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    authUser: builder.query<AuthUser, void>({
      query: () => ({ url: 'user/authUser' }),
      providesTags: ['AuthUser'],
    }),
    publicUser: builder.query<PublicUser, number>({
      query: (id) => ({ url: `user/${id}` }),
    }),
    updateAuthUser: builder.mutation<AuthUser, updateAuthUser>({
      query: (body) => ({
        url: 'user/authUser/update',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['AuthUser'],
    }),
  }),
  overrideExisting: false,
});

export const { useAuthUserQuery, useUpdateAuthUserMutation, usePublicUserQuery } = extendedApi;

// selectors
export const selectAuthUser = () =>
  extendedApi.useAuthUserQuery(undefined, {
    selectFromResult: ({ data }) => ({ authUser: data }),
  });
