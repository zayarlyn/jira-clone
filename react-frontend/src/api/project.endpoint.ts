import { api } from './api';
import type { Member, Project } from './apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    project: builder.query<Project, number>({
      query: (id) => 'project/' + id,
      providesTags: ['Project'],
    }),
    members: builder.query<Member[], number>({
      query: (id) => `project/${id}/members`,
      providesTags: ['Members'],
    }),

    // reorderIssues: builder.mutation<void, reorderIssues>({
    //   query: (body) => ({ url: 'issues/reorder', method: 'PUT', body }),
    //   invalidatesTags: ['Issues'],
    //   async onQueryStarted({ s, d }, { dispatch, queryFulfilled }) {
    //     const result = dispatch(
    //       extendedApi.util.updateQueryData('issues', undefined, (oldIssues) =>
    //         updateIssueOrderLocally(oldIssues, {
    //           s: { sId: s.sId, index: s.order - 1 },
    //           d: { dId: d.dId, index: d.newOrder - 1 },
    //         })
    //       )
    //     );
    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       result.undo();
    //     }
    //   },
    // }),
  }),
  overrideExisting: false,
});

export const { useProjectQuery, useMembersQuery } = extendedApi;

// selectors
export const selectProject = (projectId: number) =>
  extendedApi.useProjectQuery(projectId, {
    selectFromResult: ({ data }) => ({ project: data }),
  });
