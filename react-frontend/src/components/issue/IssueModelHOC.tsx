import { Button, ChakraProvider, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, useReducer, useState } from 'react';
import { CreateIssue } from '../../api/apiTypes';
import { selectLists } from '../../api/lists.endpoint';
import { selectMembers } from '../../api/project.endpoint';
import { types, priorities } from '../../category';
import { Category } from '../util/DropDown';

const reducer = (state: CreateIssue, { type, value }: IssueModelAction): CreateIssue => {
  switch (type) {
    case 'TYPE':
      return { ...state, type: value as number };
    case 'SUMMARY':
      return { ...state, summary: value as string };
    case 'DESCR':
      return { ...state, descr: value as string };
    case 'ASSIGNEE':
      return { ...state, assignee: value as number[] };
    case 'PRIORITY':
      return { ...state, priority: value as number };
    case 'LISTID':
      return { ...state, listId: value as number };
    default:
      return state;
  }
};

const initial = {
  descr: '',
  summary: '',
  priority: 0,
  type: 0,
  reporterId: null,
  assignee: [],
  listId: null,
};

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  render: FC<IssueModelProps>;
}

function IssueModelHOC(props: Props) {
  const { isOpen, setIsOpen, render: Render } = props;
  const [form, dispatch] = useReducer(reducer, initial);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const { members: apiMembers } = selectMembers(1);
  const { lists: apiLists } = selectLists();

  if (!apiMembers || !apiLists) return null;

  const members = apiMembers.map(({ username: u, profileUrl: p, userId }) => ({
    text: u,
    icon: p,
    value: userId,
  })) as Category[];
  const lists = apiLists.map(({ id, name }) => ({ text: name, value: id })) as Category[];

  const terminate = () => {
    setIsLoading(false);
    setIsOpen(false);
    setIsInvalid(false);
  };

  const handleApiMutation = (apiFunc: any) => async () => {
    console.log("I'm in");
    if (!form.summary) return setIsInvalid(true);
    setIsInvalid(false);
    setIsLoading(true);
    await apiFunc();
    terminate();
  };

  const handleClose = () => {
    terminate();
  };

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={handleClose} size='2xl'>
        <ModalOverlay bgColor='#0d67cc40' />
        <ModalContent borderRadius={2}>
          <Render
            {...{
              lists,
              members,
              types,
              priorities,
              form,
              isLoading,
              isInvalid,
              handleClose,
              dispatch,
              handleApiMutation,
            }}
          />
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default IssueModelHOC;

export type T = 'TYPE' | 'SUMMARY' | 'DESCR' | 'ASSIGNEE' | 'PRIORITY' | 'LISTID';

export type IssueModelAction = { type: T; value: number | number[] | string };

export interface IssueModelProps {
  members: Category[];
  lists: Category[];
  types: Category[];
  priorities: Category[];
  form: CreateIssue;
  isLoading: boolean;
  isInvalid: boolean;
  handleApiMutation: any;
  handleClose: () => void;
  dispatch: Dispatch<IssueModelAction>;
}
