import {
  Button,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAuthUserQuery } from '../../api/auth.endpoint';
import WithLabel from '../util/WithLabel';
import Item from '../util/Item';
import type { CreateProject } from '../../api/apiTypes';
import { useCreateProjectMutation } from '../../api/project.endpoint';
import { FieldError, FieldValues, useForm } from 'react-hook-form';
import InputWithValidation from '../util/InputWithValidation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModel = (props: Props) => {
  const { isOpen, onClose } = props;
  const { data: authUser } = useAuthUserQuery();
  const [createProject] = useCreateProjectMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: loading },
  } = useForm();

  const handleCreateProject = async (form: FieldValues) => {
    if (!authUser) return;
    try {
      await createProject({ ...form, userId: authUser.id } as CreateProject);
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
            <Stack spacing={4}>
              <InputWithValidation
                label='Project name'
                register={register('name', {
                  required: { value: true, message: 'Project name must not be empty' },
                })}
                error={errors.name as FieldError}
              />
              <InputWithValidation
                label='Short description'
                register={register('descr')}
                error={errors.descr as FieldError}
              />
              <InputWithValidation
                label='Repository link'
                register={register('repo')}
                error={errors.repo as FieldError}
              />
            </Stack>
            {authUser && (
              <WithLabel label='Members'>
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
              </WithLabel>
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
              onClick={handleSubmit(handleCreateProject)}
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
