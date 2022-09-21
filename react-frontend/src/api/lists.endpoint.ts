import { api } from './api';
import type { CreateList, DeleteList, List, ReorderList, UpdateList } from './apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    lists: builder.query<List[], number>({
      query: (projectId) => ({
        url: `project/${projectId}/lists`,
        credentials: 'include',
      }),
      providesTags: ['Lists'],
    }),
    createList: builder.mutation<List, CreateList>({
      query: (body) => ({ url: 'list/create', method: 'POST', body, credentials: 'include' }),
      invalidatesTags: ['Lists'],
    }),
    updateList: builder.mutation<List, UpdateList>({
      query: ({ listId, body }) => ({
        url: `list/${listId}/update`,
        method: 'PATCH',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Lists'],
    }),
    deleteList: builder.mutation<List, DeleteList>({
      query: ({ listId, projectId }) => ({
        url: `list/${listId}/delete`,
        method: 'DELETE',
        body: { projectId },
        credentials: 'include',
      }),
      invalidatesTags: ['Lists'],
    }),
    reorderLists: builder.mutation<void, ReorderList>({
      query: (body) => ({
        url: 'api/list/reorder',
        method: 'PUT',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Lists'],
      async onQueryStarted({ order, newOrder, projectId }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          extendedApi.util.updateQueryData('lists', projectId, (oldLists) =>
            updateListOrderLocally(oldLists, { s: order - 1, d: newOrder - 1 })
          )
        );
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useListsQuery,
  useCreateListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useReorderListsMutation,
} = extendedApi;

// selector
export const selectLists = (projectId: number) =>
  extendedApi.useListsQuery(projectId, { selectFromResult: ({ data }) => ({ lists: data }) });

// helpers
function updateListOrderLocally(array: List[], { s, d }: { s: number; d: number }) {
  const source = array.slice(0);
  const draggedIssue = source.splice(s, 1)[0]; // remove dragged item from its source list
  source.splice(d, 0, draggedIssue); // insert dragged item into target list
  return source;
}
