export interface AuthUser {
  id: number;
  username: string;
  email: string;
  profileUrl: string;
  lastLoggedIn: string;
  createdAt: string;
  updatedAt: string;
}

export type updateAuthUser = Partial<Pick<AuthUser, 'username' | 'email' | 'profileUrl'>>;

export interface List {
  id: number;
  name: string;
  order: number;
  projectId: number;
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
  comments: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Assignee {
  id: number;
  userId: number;
  issueId: number;
  projectId: number;
}

export interface Member {
  id: number;
  username: string;
  profileUrl: string;
  email: string;
  isAdmin: boolean;
  projectId: number;
  userId: number;
}

export interface Project {
  id: number;
  name: string;
  descr?: string;
  repo?: string;
  userId: number;
}

export type CreateProject = Omit<Project, 'id'>;

export interface LeaveProject {
  projectId: number;
  userId: number;
  memberId: number;
}

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

export interface AddMember {
  projectId: number;
  userId: number;
}

export interface RemoveMember extends AddMember {
  memberId: number;
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

export interface Comment {
  id: number;
  username: string;
  profileUrl?: string;
  userId: number;
  descr: string;
  createdAt: string;
}

export interface getComments {
  issueId: number;
  projectId: number;
}

export interface CreateComment {
  issueId: number;
  userId: number;
  descr: string;
  projectId: number;
}

export interface DeleteComment {
  id: number;
  projectId: number;
}
