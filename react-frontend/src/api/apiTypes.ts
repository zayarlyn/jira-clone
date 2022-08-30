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

export interface Member {
  id: number;
  username: string;
  profileUrl: string;
  email: string;
  isAdmin: boolean;
  projectId: number;
  // createdAt: string
}

export interface Project {
  id: number;
  name: string;
  descr?: string;
  repo?: string;
}

export interface SearchedUser {
  id: number;
  username: string;
  email: string;
  profileUrl: string;
}

export interface EditProject extends Partial<Project> {
  id: number;
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
}

export interface AddRemoveMember {
  userId: number;
  projectId: number;
}

export interface dndOrderData {
  s: { sId: number; index: number };
  d: { dId: number; index: number };
}
