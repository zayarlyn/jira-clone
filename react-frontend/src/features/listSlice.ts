import { createSlice, current } from '@reduxjs/toolkit';
import { sampleLists } from '../testData';
import type { RootState } from '../store/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { OrderUpdateAction } from '../types';

interface JiraList {
  id: string;
  name: string;
  order: number;
  boardId: string;
}

interface ListState {
  lists: JiraList[];
}

const initialState: ListState = { lists: sampleLists };

export const listSlice = createSlice({
  name: 'jiraLists',
  initialState,
  reducers: {
    setLists: (state, { payload }: PayloadAction<ListState['lists']>) => {
      state.lists = payload;
    },
    updateListOrder: (state, { payload }: PayloadAction<OrderUpdateAction>) => {
      state.lists = syncOrderLocally(current(state.lists), payload);
    },
  },
});

export const { setLists, updateListOrder } = listSlice.actions;
// export const selectLists = (state: RootState) => state.jiraLists;
export default listSlice.reducer;

// helper
function syncOrderLocally(array: ListState['lists'], { s, d }: OrderUpdateAction) {
  const source = array.slice(0);
  const draggedIssue = source.splice(s.index, 1)[0]; // remove dragged item from its source list
  source.splice(d.index, 0, draggedIssue); // insert dragged item into target list
  return source;
}
