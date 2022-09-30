import { api } from './api';
import type { CreateProject, EditProject, Project } from './apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    projects: builder.query<Project[], number>({
      query: (userId) => ({ url: `user/${userId}/projects`, credentials: 'include' }),
      providesTags: ['Project'],
    }),
    project: builder.query<Project, number>({
      query: (projectId) => ({
        url: 'project/' + projectId,
        credentials: 'include',
      }),
      providesTags: ['Project'],
    }),
    createProject: builder.mutation<Project, CreateProject>({
      query: (body) => ({ url: 'project/create', method: 'POST', body, credentials: 'include' }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<void, EditProject>({
      query: (body) => ({ url: `project/${body.id}`, method: 'PUT', body, credentials: 'include' }),
      invalidatesTags: ['Project'],
      async onQueryStarted({ id, ...newData }, { dispatch }) {
        dispatch(
          extendedApi.util.updateQueryData('project', id, (oldData) => ({ ...oldData, ...newData }))
        );
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useProjectsQuery,
  useProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = extendedApi;

// selectors
export const selectCurrentProject = (projectId: number) =>
  extendedApi.useProjectQuery(projectId, {
    selectFromResult: ({ data }) => ({ project: data }),
  });
