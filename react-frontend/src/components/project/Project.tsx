import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { APIERROR, IssueQuery } from '../../api/apiTypes';
import { useIssuesQuery } from '../../api/issues.endpoint';
import { useListsQuery } from '../../api/lists.endpoint';
import Board from './Board';
import Filter from './Filter';

const Project = () => {
  const projectId = Number(useParams().projectId);
  const [issueQueryData, setIssueQueryData] = useState<Omit<IssueQuery, 'projectId'>>({});
  const { data: lists, error: listError } = useListsQuery(projectId);

  const { data: issues, error: issueError } = useIssuesQuery(
    {
      projectId,
      ...issueQueryData,
    },
    { refetchOnMountOrArgChange: true }
  );

  console.log({ listError, issueError });

  if (listError && issueError) {
    if ((listError as APIERROR).status === 401 || (issueError as APIERROR).status === 401)
      return <Navigate to='/login' />;
    return (
      <div className='grow grid place-items-center h-full text-xl'>
        You are not part of this project ☝
      </div>
    );
  }

  return (
    <div className='flex grow flex-col'>
      <div className='mx-10'>
        <h1 className='mb-4 text-xl font-semibold text-light-c-3'>Kanban Board</h1>
      </div>
      <Filter {...{ issueQueryData, setIssueQueryData, projectId }} />
      <Board {...{ lists, issues }} />
    </div>
  );
};

export default Project;
