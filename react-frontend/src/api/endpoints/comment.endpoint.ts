import { api } from '../api';
import { Comment, CreateComment, DeleteComment, getComments } from '../apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    cmts: builder.query<Comment[], getComments>({
      query: ({ issueId, projectId }) => ({
        url: `issue/${issueId}/comments?projectId=${projectId}`,
      }),
      providesTags: ['Comments'],
    }),
    createCmt: builder.mutation<void, CreateComment>({
      query: (body) => ({ url: 'comment/create', method: 'POST', body }),
      invalidatesTags: ['Comments'],
    }),
    deleteCmt: builder.mutation<void, DeleteComment>({
      query: ({ id, ...body }) => ({
        url: `comment/${id}/delete`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
  overrideExisting: false,
});

export const { useCmtsQuery, useCreateCmtMutation, useDeleteCmtMutation } = extendedApi;
