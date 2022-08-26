import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { List, ReorderList, Issue, reorderIssues, Issues } from './apiTypes';

export const jiraAPI = createApi({
  reducerPath: 'jiraApiReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Lists', 'Issues'],
  endpoints: (builder) => ({
    lists: builder.query<List[], void>({
      query: () => 'projects/1/lists',
      providesTags: ['Lists'],
    }),
    issues: builder.query<Issues, void>({
      query: () => 'projects/1/issues',
      providesTags: ['Issues'],
    }),
    reorderLists: builder.mutation<void, ReorderList>({
      query: (body) => ({
        url: 'lists/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Lists'],
      async onQueryStarted({ order, newOrder }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          jiraAPI.util.updateQueryData('lists', undefined, (oldLists) =>
            updateListOrderLocally(oldLists, { s: order - 1, d: newOrder - 1 })
          )
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
    reorderIssues: builder.mutation<void, reorderIssues>({
      query: (body) => ({ url: 'issues/reorder', method: 'PUT', body }),
      invalidatesTags: ['Issues'],
      async onQueryStarted({ s, d }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          jiraAPI.util.updateQueryData('issues', undefined, (oldIssues) =>
            updateIssueOrderLocally(oldIssues, {
              s: { sId: s.sId, index: s.order - 1 },
              d: { dId: d.dId, index: d.newOrder - 1 },
            })
          )
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
  }),
});

export const { useListsQuery, useIssuesQuery, useReorderListsMutation, useReorderIssuesMutation } =
  jiraAPI;

function updateListOrderLocally(array: List[], { s, d }: { s: number; d: number }) {
  const source = array.slice(0);
  const draggedIssue = source.splice(s, 1)[0]; // remove dragged item from its source list
  source.splice(d, 0, draggedIssue); // insert dragged item into target list
  return source;
}

const updateIssueOrderLocally = (
  issues: Issues,
  { s, d }: { s: { sId: number; index: number }; d: { dId: number; index: number } }
) => {
  const source = issues[s.sId].slice(0);
  const target = issues[d.dId].slice(0);
  const draggedIssue = source.splice(s.index, 1)[0]; // remove dragged item from its source list
  (s.sId === d.dId ? source : target).splice(d.index, 0, draggedIssue); // insert dragged item into target list
  return { ...issues, [d.dId]: target, [s.sId]: source } as Issues;
};
