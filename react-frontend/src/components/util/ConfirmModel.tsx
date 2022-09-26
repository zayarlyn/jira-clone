import {
  Button,
  ButtonGroup,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<any>;
}

const ConfirmModel = (props: Props) => {
  const { isOpen, onClose, onSubmit } = props;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(true);
    onClose();
  };

  return (
    <ChakraProvider>
      <Modal {...{ isOpen, onClose }} isCentered size='xs'>
        <ModalOverlay bgColor='#0d67cc40' />
        <ModalContent borderRadius={4}>
          <ModalBody py={8}>
            <Text textAlign='center'>Are you sure you want to delete?</Text>
            <ButtonGroup size='sm' mt={6} w='full' justifyContent='center' gap={3}>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={handleDelete} isLoading={loading} colorScheme='red'>
                Delete
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ConfirmModel;
