import { api } from './api';
import type { EditProject, Project } from './apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    projects: builder.query<Project[], void>({
      query: () => ({ url: 'project', credentials: 'include' }),
      providesTags: ['Project'],
    }),
    project: builder.query<Project, number>({
      query: (projectId) => ({ url: 'project/' + projectId, credentials: 'include' }),
      providesTags: ['Project'],
    }),
    editProject: builder.mutation<void, EditProject>({
      query: (body) => ({ url: 'project/1', method: 'PUT', body, credentials: 'include' }),
      invalidatesTags: ['Project'],
      async onQueryStarted({ id, ...newData }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          extendedApi.util.updateQueryData('project', id, (oldData) => ({ ...oldData, ...newData }))
        );
      },
    }),
  }),
  overrideExisting: false,
});

export const { useProjectsQuery, useProjectQuery, useEditProjectMutation } = extendedApi;

// selectors
export const selectProject = (projectId: number) =>
  extendedApi.useProjectQuery(projectId, {
    selectFromResult: ({ data }) => ({ project: data }),
  });
