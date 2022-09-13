import { useState } from 'react';
import { useIssuesQuery } from '../../api/issues.endpoint';
import { useListsQuery } from '../../api/lists.endpoint';
import Board from './Board';
import Details from './Details';

import Filter from './Filter';

interface IssueQuery {
  username: string;
}

const Project = () => {
  const [issueQuery, setIssueQuery] = useState<IssueQuery>({ username: 'fk' });
  const { data: lists, isSuccess: listsAreReady } = useListsQuery();
  const { data: issues, isSuccess: issuesAreReady } = useIssuesQuery({ projectId: 1 });

  return (
    <div className='flex grow flex-col'>
      <Details />
      <Filter />
      {lists && issues && <Board {...{ lists, issues, listsAreReady, issuesAreReady }} />}
    </div>
  );
};

export default Project;
