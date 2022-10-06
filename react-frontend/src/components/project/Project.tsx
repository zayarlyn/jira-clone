import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { APIERROR, IssueQuery } from '../../api/apiTypes';
import { useIssuesQuery } from '../../api/issues.endpoint';
import { useListsQuery } from '../../api/lists.endpoint';
import Board from './Board';
import Filter from './Filter';
import SS from '../util/SpinningCircle';

const Project = () => {
  const projectId = Number(useParams().projectId);
  const [issueQueryData, setIssueQueryData] = useState<Omit<IssueQuery, 'projectId'>>({});
  const { data: lists, error: listError } = useListsQuery(projectId);
  const [isDragDisabled, setIsDragDisabled] = useState(false);

  const { data: issues, error: issueError } = useIssuesQuery(
    {
      projectId,
      ...issueQueryData,
    },
    { refetchOnMountOrArgChange: true }
  );

  if (listError && issueError) {
    if ((listError as APIERROR).status === 401 || (issueError as APIERROR).status === 401)
      return <Navigate to='/login' />;
    return (
      <div className='grid h-full grow place-items-center text-xl'>
        You are not part of this project ☝
      </div>
    );
  }

  return (
    <div className='flex grow flex-col'>
      <div className='mx-10 mt-6'>
        <h1 className='mb-4 text-xl font-semibold text-c-text'>Kanban Board</h1>
      </div>
      <Filter
        isEmpty={lists?.length === 0}
        {...{ issueQueryData, setIssueQueryData, projectId, setIsDragDisabled }}
      />

      {lists ? (
        <Board {...{ lists, issues, isDragDisabled }} />
      ) : (
        <div className='grid h-[40vh] w-full place-items-center'>
          <SS />
        </div>
      )}
    </div>
  );
};

export default Project;
