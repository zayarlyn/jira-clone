import { api } from './api';
import { List, ReorderList } from './apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    lists: builder.query<List[], void>({
      query: () => 'project/1/lists',
      providesTags: ['Lists'],
    }),
    reorderLists: builder.mutation<void, ReorderList>({
      query: (body) => ({
        url: 'list/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Lists'],
      async onQueryStarted({ order, newOrder }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          extendedApi.util.updateQueryData('lists', undefined, (oldLists) =>
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
  }),
  overrideExisting: false,
});

export const { useListsQuery, useReorderListsMutation } = extendedApi;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

function updateListOrderLocally(array: List[], { s, d }: { s: number; d: number }) {
  const source = array.slice(0);
  const draggedIssue = source.splice(s, 1)[0]; // remove dragged item from its source list
  source.splice(d, 0, draggedIssue); // insert dragged item into target list
  return source;
}
