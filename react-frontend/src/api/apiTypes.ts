export interface List {
  id: number;
  name: string;
  order: number;
  // createdAt: string;
  // updatedAt: string;
}

export interface ReorderList {
  id: number;
  order: number;
  newOrder: number;
  projectId: number;
}
