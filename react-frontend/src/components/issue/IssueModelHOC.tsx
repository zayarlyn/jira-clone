import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { selectLists } from '../../api/endpoints/lists.endpoint';
import { selectMembers } from '../../api/endpoints/member.endpoint';
import { types, priorities } from '../../utils';
import { Category } from '../util/DropDown';

export type IssueMetaData = { listIdx: number; listId: number; idx: number };

interface Props {
  onClose: () => void;
  children: FC<IssueModalProps>;
  issue?: IssueMetaData;
}

const IssueModelHOC = (props: Props) => {
  const projectId = Number(useParams().projectId);
  const { children: Component, ...PROPS } = props;
  const { members: apiMembers } = selectMembers(projectId);
  const { lists: apiLists } = selectLists(projectId);

  const members = apiMembers
    ? (apiMembers.map(({ username: u, profileUrl: p, userId }) => ({
        text: u,
        icon: p,
        value: userId,
      })) as Category[])
    : [];
  const lists = apiLists
    ? (apiLists.map(({ id, name }) => ({
        text: name,
        value: id,
      })) as Category[])
    : [];

  return (
    <Component
      {...{
        projectId,
        lists,
        members,
        types,
        priorities,
      }}
      {...PROPS}
    />
  );
};

export default IssueModelHOC;

export interface IssueModalProps {
  projectId: number;
  issue?: IssueMetaData;
  members: Category[];
  lists: Category[];
  types: Category[];
  priorities: Category[];
  onClose: () => void;
}
