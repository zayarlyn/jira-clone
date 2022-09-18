import { api } from './api';
import type { AddRemoveMember, Member } from './apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    members: builder.query<Member[], number>({
      query: (id) => ({ url: `project/${id}/members`, credentials: 'include' }),
      providesTags: ['Members'],
    }),
    removeMember: builder.mutation<void, AddRemoveMember>({
      query: ({ userId, projectId }) => ({
        url: `member/remove?userId=${userId}&projectId=${projectId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Members'],
    }),
    addMember: builder.mutation<void, AddRemoveMember>({
      query: ({ userId, projectId }) => ({
        url: `member/add?userId=${userId}&projectId=${projectId}`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: ['Members'],
    }),
  }),
  overrideExisting: false,
});

export const { useMembersQuery, useRemoveMemberMutation, useAddMemberMutation } = extendedApi;

// selectors
export const selectMembers = (projectId: number) =>
  extendedApi.useMembersQuery(projectId, {
    selectFromResult: ({ data }) => ({ members: data }),
  });
