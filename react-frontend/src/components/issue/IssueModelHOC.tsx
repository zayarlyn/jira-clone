import { ChakraProvider, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';
import { selectLists } from '../../api/lists.endpoint';
import { selectMembers } from '../../api/member.endpoint';
import { types, priorities } from '../../category';
import { Category } from '../util/DropDown';

type IssueMetaData = { listId: number; idx: number };

interface Props {
  isOpen: boolean;
  size?: 'responsive' | 'fixed';
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  render: FC<IssueModelProps>;
  issue?: IssueMetaData;
}

function IssueModelHOC(props: Props) {
  const { issue, size = 'responsive', isOpen, setIsOpen, render: Render } = props;
  const { members: apiMembers } = selectMembers(1);
  const { lists: apiLists } = selectLists();

  if (!apiMembers || !apiLists) return null;

  const members = apiMembers.map(({ username: u, profileUrl: p, userId }) => ({
    text: u,
    icon: p,
    value: userId,
  })) as Category[];
  const lists = apiLists.map(({ id, name }) => ({ text: name, value: id })) as Category[];

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={handleClose} autoFocus={false} isCentered size='xl'>
        <ModalOverlay bgColor='#0d67cc40' />
        <ModalContent
          borderRadius={2}
          mx={8}
          {...(size === 'responsive' && { minW: 'min(80%, 60rem)' })}
        >
          <Render
            {...{
              lists,
              members,
              types,
              priorities,
              issue: issue as IssueMetaData,
              handleClose,
            }}
          />
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default IssueModelHOC;

export type T = 'TYPE' | 'SUMMARY' | 'DESCR' | 'ASSIGNEE' | 'PRIORITY' | 'LISTID';

// export type IssueModelAction = { type: T; value: number | number[] | string };

export interface IssueModelProps {
  issue?: IssueMetaData;
  members: Category[];
  lists: Category[];
  types: Category[];
  priorities: Category[];
  handleClose: () => void;
}
