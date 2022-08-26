import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, store } from '../store/store';

interface ProjectSlice {
  project: {
    name?: string;
    descr?: string;
    repo?: string;
  };
}
const initialState: ProjectSlice = {
  project: { name: 'Bleach: TYBW', descr: 'Final Arc: Thousand Years Blood War' },
};

export const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<ProjectSlice['project']>) => {
      state.project = payload;
    },
  },
});

export const { update } = projectSlice.actions;
// export const selectProject = (state: RootState) => state.jiraProject.project;
export default projectSlice.reducer;
