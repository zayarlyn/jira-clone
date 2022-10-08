import { api } from '../api';
import type {
  CreateIssue,
  DeleteIssue,
  dndOrderData,
  IssueQuery,
  Issues,
  reorderIssues,
  UpdateIssue,
} from '../apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    issues: builder.query<Issues, IssueQuery>({
      query: ({ projectId, userId: uid }) => ({
        url: `project/${projectId}/issues${uid ? '?userId=' + uid : ''}`,
      }),
      providesTags: ['Issues'],
    }),
    createIssue: builder.mutation<void, CreateIssue>({
      query: (body) => ({ url: 'issue/create', method: 'POST', body }),
      invalidatesTags: ['Issues'],
    }),
    updateIssue: builder.mutation<void, UpdateIssue>({
      query: ({ id, body }) => ({
        url: `issue/${id}/update`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Issues'],
    }),
    deleteIssue: builder.mutation<void, DeleteIssue>({
      query: ({ issueId, projectId }) => ({
        url: `issue/${issueId}/delete`,
        method: 'DELETE',
        body: { projectId },
      }),
      invalidatesTags: ['Issues'],
    }),
    reorderIssues: builder.mutation<void, reorderIssues>({
      query: (body) => ({ url: 'issue/reorder', method: 'PUT', body }),
      invalidatesTags: ['Issues'],
      async onQueryStarted({ s, d, projectId }, { dispatch }) {
        dispatch(
          extendedApi.util.updateQueryData('issues', { projectId }, (oldIssues) =>
            updateIssueOrderLocally(oldIssues, {
              s: { sId: s.sId, index: s.order - 1 },
              d: { dId: d.dId, index: d.newOrder - 1 },
            })
          )
        );
      },
    }),
  }),
  overrideExisting: false,
});

// hooks
export const {
  useIssuesQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
  useReorderIssuesMutation,
} = extendedApi;

// selectors
interface IssueSelector extends IssueQuery {
  listId: number;
}

export const selectIssuesArray = ({ listId, ...query }: IssueSelector) =>
  extendedApi.useIssuesQuery(query, {
    selectFromResult: ({ data }) => ({
      issues: data ? data[listId] : [],
    }),
    refetchOnMountOrArgChange: true,
  });

// helpers
const updateIssueOrderLocally = (issues: Issues, { s, d }: dndOrderData) => {
  const source = issues[s.sId].slice(0);
  const target = issues[d.dId].slice(0);
  const draggedIssue = source.splice(s.index, 1)[0]; // remove dragged item from its source list
  (s.sId === d.dId ? source : target).splice(d.index, 0, draggedIssue); // insert dragged item into target list
  return { ...issues, [d.dId]: target, [s.sId]: source } as Issues;
};
