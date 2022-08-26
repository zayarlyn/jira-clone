export interface List {
  id: number;
  name: string;
  order: number;
  // createdAt: string;
  // updatedAt: string;
}

export interface Issue {
  id: number;
  name: string;
  order: number;
  listId: number;
}
export interface Issues {
  [key: string]: Issue[];
}

export interface ReorderList {
  id: number;
  order: number;
  newOrder: number;
  projectId: number;
}

export interface reorderIssues {
  id: number;
  s: {
    sId: number;
    order: number;
  };
  d: {
    dId: number;
    newOrder: number;
  };
  projectId: number;
}
