import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IssueQuery } from '../../api/apiTypes';
import { useIssuesQuery } from '../../api/issues.endpoint';
import { useListsQuery } from '../../api/lists.endpoint';
import Board from './Board';
import Details from './Details';
import Filter from './Filter';

const Project = () => {
  const projectId = Number(useParams().projectId);
  const [issueQueryData, setIssueQueryData] = useState<Omit<IssueQuery, 'projectId'>>({});
  const { data: lists, isSuccess: listsAreReady, isError: listsError } = useListsQuery(projectId);
  const {
    data: issues,
    isSuccess: issuesAreReady,
    isError: issuesError,
  } = useIssuesQuery(
    {
      projectId,
      ...issueQueryData,
    },
    { refetchOnMountOrArgChange: true }
  );

  if (listsError && issuesError)
    return (
      <div className='grow grid place-items-center h-full text-xl'>
        You are not part of this project ☝
      </div>
    );

  return (
    <div className='flex grow flex-col'>
      <Details />
      <Filter {...{ issueQueryData, setIssueQueryData, projectId }} />
      {lists && issues && <Board {...{ lists, issues, listsAreReady, issuesAreReady }} />}
    </div>
  );
};

export default Project;
