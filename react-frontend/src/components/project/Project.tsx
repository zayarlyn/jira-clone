import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IssueQuery } from '../../api/apiTypes';
import { useIssuesQuery } from '../../api/issues.endpoint';
import { useListsQuery } from '../../api/lists.endpoint';
import Board from './Board';
import Details from './Details';

import Filter from './Filter';

const Project = () => {
  const { projectId } = useParams();
  console.log();
  const [issueQueryData, setIssueQueryData] = useState<Omit<IssueQuery, 'projectId'>>({});
  const { data: lists, isSuccess: listsAreReady } = useListsQuery();
  const { data: issues, isSuccess: issuesAreReady } = useIssuesQuery(
    {
      projectId: +projectId!,
      ...issueQueryData,
    },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className='flex grow flex-col'>
      <Details />
      <Filter {...{ issueQueryData, setIssueQueryData }} />
      {lists && issues && <Board {...{ lists, issues, listsAreReady, issuesAreReady }} />}
    </div>
  );
};

export default Project;
