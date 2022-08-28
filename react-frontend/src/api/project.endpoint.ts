import { api } from './api';
import type { EditProject, Member, Project } from './apiTypes';

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
    editProject: builder.mutation<void, EditProject>({
      query: (body) => ({ url: 'project/1', method: 'PUT', body }),
      invalidatesTags: ['Project'],
      async onQueryStarted({ id, ...newData }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          extendedApi.util.updateQueryData('project', id, (oldData) => ({ ...oldData, ...newData }))
        );
      },
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

export const { useProjectQuery, useMembersQuery, useEditProjectMutation } = extendedApi;

// selectors
export const selectProject = (projectId: number) =>
  extendedApi.useProjectQuery(projectId, {
    selectFromResult: ({ data }) => ({ project: data }),
  });
