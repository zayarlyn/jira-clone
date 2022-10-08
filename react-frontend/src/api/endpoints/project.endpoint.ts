import { api } from '../api';
import type { CreateProject, EditProject, LeaveProject, Project } from '../apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    projects: builder.query<Project[], number>({
      query: (userId) => ({ url: `user/${userId}/projects` }),
      providesTags: ['Project'],
    }),
    project: builder.query<Project, number>({
      query: (projectId) => ({
        url: 'project/' + projectId,
      }),
      providesTags: ['Project'],
    }),
    createProject: builder.mutation<Project, CreateProject>({
      query: (body) => ({ url: 'project/create', method: 'POST', body }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation<void, number>({
      query: (projectId) => ({
        url: `project/${projectId}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
    leaveProject: builder.mutation<void, LeaveProject>({
      query: ({ projectId, ...body }) => ({
        url: `project/${projectId}/leave`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<void, EditProject>({
      query: (body) => ({ url: `project/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['Project'],
      async onQueryStarted({ id, ...newData }, { dispatch }) {
        dispatch(
          extendedApi.util.updateQueryData('project', id, (oldData) => ({
            ...oldData,
            ...newData,
          }))
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
  useLeaveProjectMutation,
  useDeleteProjectMutation,
} = extendedApi;

// selectors
export const selectCurrentProject = (projectId: number) =>
  extendedApi.useProjectQuery(projectId, {
    selectFromResult: ({ data }) => ({ project: data }),
  });
