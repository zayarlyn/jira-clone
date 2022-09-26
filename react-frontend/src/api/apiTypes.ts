export interface AuthUser {
  id: number;
  username: string;
  profileUrl: string;
  lastLoggedIn: string;
  createdAt: string;
  updatedAt: string;
}

export interface List {
  id: number;
  name: string;
  order: number;
  projectId: number;
  // createdAt: string;
  // updatedAt: string;
}

export interface CreateList {
  projectId: number;
}

export interface UpdateList {
  listId: number;
  body: Partial<List>;
}

export interface DeleteList {
  listId: number;
  projectId: number;
}

export interface Issue {
  id: number;
  summary: string;
  descr: string;
  type: number;
  priority: number;
  order: number;
  listId: number;
  reporterId: number;
  assignees: Assignee[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Assignee {
  id: number;
  userId: number;
  issueId: number;
  // createdAt: string
}

export interface Member {
  id: number;
  username: string;
  profileUrl: string;
  email: string;
  isAdmin: boolean;
  projectId: number;
  userId: number;
  // createdAt: string
}

export interface Project {
  id: number;
  name: string;
  descr?: string;
  repo?: string;
  userId: number;
}

export type CreateProject = Omit<Project, 'id'>;

export interface PublicUser {
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
  projectId: number;
}

export interface AddRemoveMember {
  userId: number;
  projectId: number;
}

export interface dndOrderData {
  s: { sId: number; index: number };
  d: { dId: number; index: number };
}

export interface CreateIssue {
  id?: number;
  type: number;
  reporterId: number | null;
  assignees: number[];
  listId: number | null;
  priority: number;
  summary: string;
  descr: string;
  createdAt?: string;
  updatedAt?: string;
  projectId: number;
}

export type UpdateIssueType =
  | 'type'
  | 'summary'
  | 'descr'
  | 'assignee'
  | 'priority'
  | 'listId'
  | 'addAssignee'
  | 'removeAssignee';

export interface UpdateIssue {
  id: number;
  body: {
    type: UpdateIssueType;
    value: string | number | number[];
    projectId: number;
  };
}

export interface DeleteIssue {
  issueId: number;
  projectId: number;
}

export interface IssueQuery {
  projectId: number;
  userId?: number;
}

export interface APIERROR {
  message: string;
  status: number;
}
