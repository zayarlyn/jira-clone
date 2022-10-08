import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuerySlice {
  issue: { userId?: number };
}

const initialState: QuerySlice = { issue: {} };

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setIssueQuery: (state, action: PayloadAction<QuerySlice['issue']>) => {
      state.issue = action.payload;
    },
  },
});

export const { setIssueQuery } = querySlice.actions;

export default querySlice.reducer;
