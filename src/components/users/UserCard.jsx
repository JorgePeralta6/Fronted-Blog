'use user';

import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Badge,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import UserFormModal from './UserFormModal';

export const UserCard = ({
    user,
    handleEditUser,
    handleDeleteUser
}) => {

    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onClose: onDeleteClose,
    } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Center py={6}>
            <Box
                maxW="320px"
                w="full"
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow="2xl"
                rounded="lg"
                p={6}
                textAlign="center"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                onClick={() => handleEditUser(user)}
                _hover={{
                    transform: 'scale(1.05)',
                    boxShadow: '3xl',
                }}
            >
                <Heading fontSize="2xl" fontFamily="body">
                    {user.name} {user.lastname}
                </Heading>
                <Text color={useColorModeValue('gray.700', 'gray.400')} px={3} py={3}>
                    {user.email}
                </Text>
                <Text color={useColorModeValue('gray.700', 'gray.400')} px={3} py={1}>
                    {user.phone}
                </Text>

                <Stack mt={2} direction="row" spacing={4}>
                    <Button
                        flex={1}
                        fontSize="sm"
                        rounded="full"
                        bg="red.400"
                        color="white"
                        _hover={{ bg: 'red.500' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteOpen();
                        }}
                    >
                        Delete
                    </Button>
                    <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Are you sure?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                This action will delete the user <strong>{user.name} {user.lastname}</strong>. Do you want to continue?
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="red" onClick={async () => {
                                    await handleDeleteUser(user.uid);
                                    onDeleteClose();
                                }}>
                                    Yes, delete
                                </Button>
                                <Button variant="ghost" onClick={onDeleteClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Stack>
                <UserFormModal isOpen={isOpen} onClose={onClose} />
            </Box>
        </Center>
    );
}

export default UserCard;
