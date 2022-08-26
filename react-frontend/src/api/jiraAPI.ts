import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { List, ReorderList } from './apiTypes';

export const jiraAPI = createApi({
  reducerPath: 'jiraApiReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Lists'],
  endpoints: (builder) => ({
    lists: builder.query<List[], void>({
      query: () => 'projects/1/lists',
      providesTags: ['Lists'],
    }),
    reorderLists: builder.mutation<void, ReorderList>({
      query: (body) => ({
        url: 'lists/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Lists'],
      async onQueryStarted({ order, newOrder }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          jiraAPI.util.updateQueryData('lists', undefined, (oldLists) =>
            syncOrderLocally(oldLists, { s: order - 1, d: newOrder - 1 })
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useListsQuery, useReorderListsMutation } = jiraAPI;

function syncOrderLocally(array: List[], { s, d }: { s: number; d: number }) {
  const source = array.slice(0);
  const draggedIssue = source.splice(s, 1)[0]; // remove dragged item from its source list
  source.splice(d, 0, draggedIssue); // insert dragged item into target list
  return source;
}
