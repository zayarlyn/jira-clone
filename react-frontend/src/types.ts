import { DraggableLocation } from '@hello-pangea/dnd';
import { PayloadAction } from '@reduxjs/toolkit';

export interface JiraList {
  id: string;
  name: string;
  order: number;
  boardId: string;
}

export interface JiraIssue {
  id: string;
  name: string;
  order: number;
  listId: string;
  boardId: string;
}

export interface OrderUpdateAction {
  s: DraggableLocation;
  d: DraggableLocation;
}
