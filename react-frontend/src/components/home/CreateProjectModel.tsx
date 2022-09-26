import {
  Button,
  ChakraProvider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import { useAuthUserQuery } from '../../api/auth.endpoint';
import MemberInput from '../project/MemberInput';
import UserMember from '../project/UserMember';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';
import type { CreateProject } from '../../api/apiTypes';
import { useCreateProjectMutation } from '../../api/project.endpoint';

const reducer = (state: S, { type, value }: A): S => {
  switch (type) {
    case 'NAME':
      return { ...state, name: value };
    case 'DESCR':
      return { ...state, descr: value };
    case 'REPO':
      return { ...state, repo: value };
    default:
      return state;
  }
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModel = (props: Props) => {
  const { isOpen, onClose } = props;
  const { data: authUser } = useAuthUserQuery();
  const [createProject] = useCreateProjectMutation();
  const [form, dispatch] = useReducer(reducer, {} as S);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleCreateProject = async () => {
    if (!form.name || !authUser) return setInvalid(true);
    setLoading(true);
    try {
      await createProject({ ...form, userId: authUser.id });
      onClose();
    } catch (err) {}
  };

  return (
    <ChakraProvider>
      <Modal {...{ isOpen, onClose }} isCentered size='lg'>
        <ModalOverlay bgColor='#0d67cc40' />
        <ModalContent borderRadius={4}>
          <ModalHeader>
            <Text fontWeight={500} fontSize={19}>
              Create Project
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormWithLabel label='Project name'>
              <>
                <Input
                  size='sm'
                  variant='filled'
                  borderWidth={1}
                  borderColor='gray.300'
                  _focus={{ borderWidth: 2 }}
                  value={form.name ?? ''}
                  onChange={(e) => dispatch({ type: 'NAME', value: e.target.value })}
                  isRequired
                />
                {invalid && (
                  <span className='text-[13px] text-red-500'>Project name must not be empty</span>
                )}
              </>
            </FormWithLabel>
            <FormWithLabel label='Short description'>
              <Input
                size='sm'
                variant='filled'
                borderWidth={1}
                borderColor='gray.300'
                _focus={{ borderWidth: 2 }}
                value={form.descr}
                onChange={(e) => dispatch({ type: 'DESCR', value: e.target.value })}
                isRequired
              />
            </FormWithLabel>
            <FormWithLabel label='Repository link'>
              <Input
                size='sm'
                variant='filled'
                borderWidth={1}
                borderColor='gray.300'
                _focus={{ borderWidth: 2 }}
                value={form.repo}
                onChange={(e) => dispatch({ type: 'REPO', value: e.target.value })}
                isRequired
              />
            </FormWithLabel>
            {authUser && (
              <FormWithLabel label='Members'>
                <>
                  <Button
                    display='flex'
                    justifyContent='start'
                    size='sm'
                    w='full'
                    borderWidth={1}
                    borderColor='gray.300'
                    borderRadius={3}
                    px={4}
                  >
                    <Item
                      text={authUser.username}
                      icon={authUser.profileUrl}
                      className='w-6 h-6 mr-4 rounded-full object-cover'
                    />
                  </Button>
                  <Text fontSize='sm' mt={2}>
                    * you can add more members after creating the project *
                  </Text>
                </>
              </FormWithLabel>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              size='sm'
              fontSize={16}
              fontWeight={500}
              variant='ghost'
              mr={4}
              onClick={onClose}
            >
              cancel
            </Button>
            <Button
              size='sm'
              fontSize={16}
              fontWeight={500}
              borderRadius={3}
              colorScheme='messenger'
              isLoading={loading}
              onClick={handleCreateProject}
            >
              create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CreateProjectModel;

type S = Omit<CreateProject, 'id'>;

type A = { type: 'NAME' | 'DESCR' | 'REPO'; value: string };
