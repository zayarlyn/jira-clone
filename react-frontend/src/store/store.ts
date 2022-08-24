import { configureStore } from '@reduxjs/toolkit';
import listReducer from '../features/listSlice';
import issueReducer from '../features/issueSlice';
import projectSlice from '../features/projectSlice';

export const store = configureStore({
  reducer: {
    jiraLists: listReducer,
    jiraIssues: issueReducer,
    jiraProject: projectSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
