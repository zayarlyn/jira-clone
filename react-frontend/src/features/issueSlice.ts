import { createSlice, current } from '@reduxjs/toolkit';
import { sampleIssues } from '../testData';
import type { RootState } from '../store/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { OrderUpdateAction } from '../types';

export interface JiraIssue {
  id: string;
  name: string;
  order: number;
  listId: string;
  boardId: string;
}

interface IssueState {
  issues: { [key: string]: JiraIssue[] };
}

const initialState: IssueState = { issues: sampleIssues };

export const issueSlice = createSlice({
  name: 'IssueIssues',
  initialState,
  reducers: {
    setIssuesInList: (state, { payload }: PayloadAction<IssueState['issues']>) => {
      state.issues = { ...state.issues, ...payload };
    },
    updateIssueOrder: (state, { payload }: PayloadAction<OrderUpdateAction>) => {
      state.issues = updateOrderLocally(current(state.issues), payload);
    },
  },
});

export const { setIssuesInList, updateIssueOrder } = issueSlice.actions;
export const selectIssues = (state: RootState) => state.jiraIssues;
export default issueSlice.reducer;

// helper

// I'm sure this function is complicated to interpret, the order of properties in the return statement matter
const updateOrderLocally = (issues: IssueState['issues'], { s, d }: OrderUpdateAction) => {
  const sid = extractId(s.droppableId);
  const did = extractId(d.droppableId);
  const source = issues[sid].slice(0);
  const target = issues[did].slice(0);
  const draggedIssue = source.splice(s.index, 1)[0]; // remove dragged item from its source list
  (sid === did ? source : target).splice(d.index, 0, draggedIssue); // insert dragged item into target list
  return { ...issues, [did]: target, [sid]: source };
};

const extractId = (domId: string) => domId.split('-')[2];
