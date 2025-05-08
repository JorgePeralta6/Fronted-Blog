import NavBar from "../NavBar";
import { Users } from "./Users";
import { useUser } from "../../shared/hooks/useUsers";
import {
    useDisclosure,
    Flex,
    Button,
    Text,
    Box,
    chakra
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import UserFormModal from "./UserFormModal";
import { deleteUser } from "../../services";
import toast from "react-hot-toast";
import { UserSearch } from "./UserSearch";
import { motion } from "framer-motion";

const UsersPage = () => {
    const { getUsers, users, isFetching, total } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedUser, setSelectedUser] = useState(null);
    const [desde, setDesde] = useState(0);
    const limite = 12;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const MotionBox = chakra(motion.div);

    const backgroundVariants = {
        initial: {
            background: 'linear-gradient(135deg,rgb(197, 71, 71),rgba(161, 196, 253, 0.34))',
            transition: { duration: 1 },
        },
        animate: {
            background: 'linear-gradient(135deg, rgba(161, 196, 253, 0.34), rgb(197, 71, 71))',
            transition: { duration: 1 },
        },
    };

    useEffect(() => {
        getUsers({ limite, desde });
    }, [desde]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredUsers(
                users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setFilteredUsers(users || []);
        }
    }, [searchTerm, users]);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        onOpen();
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        onOpen();
    };

    const handleDeleteUser = async (id) => {
        let res = await deleteUser(id);

        if (res?.error) {
            return toast.error(res.msg, {
                style: {
                    background: 'red',
                    color: 'white',
                    whiteSpace: 'pre-line',
                }
            });
        }

        toast.success('User eliminado con éxito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        });

        onClose();
        await getUsers({ limite, desde });
    };

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term.trim()) {
            await getUsers({ limite: 0, desde: 0 });
        } else {
            await getUsers({ limite, desde });
        }
    }

    const handleUserSaved = async () => {
        await getUsers({ limite, desde });
    };

    const handlePrev = () => {
        if (desde - limite >= 0) {
            setDesde(desde - limite);
        }
    };

    const handleNext = () => {
        if (desde + limite < total) {
            setDesde(desde + limite);
        }
    };

    return (
        <>
            <NavBar />
            <MotionBox
                variants={backgroundVariants}
                initial="initial"
                animate="animate"
                minH="100vh"
                p={4}
            >
                <Flex
                    h="10vh"
                    justifyContent="flex-end"
                    alignItems="center"
                    px={8}
                >
                    <Box p={6} width='500px'>
                        <UserSearch onSearch={handleSearch} />
                    </Box>

                    <Button
                        px={4}
                        fontSize="md"
                        rounded="full"
                        bg="gray.400"
                        color="white"
                        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)"
                        _hover={{ bg: 'gray.500' }}
                        _focus={{ bg: 'gray.500' }}
                        onClick={handleAddUser}
                    >
                        Agregar
                    </Button>

                </Flex>

                {isFetching ? (
                    "Cargando usuarios..."
                ) : filteredusers.length > 0 ? (
                    <Users
                        users={filteredUsers}
                        handleEditUser={handleEditUser}
                        handleDeleteUser={handleDeleteUser}
                    />
                ) : (
                    "No se encontraron usuarios."
                )}

                <Flex justifyContent="center" alignItems="center" mt={6} gap={4} m={10} >
                    <Button onClick={handlePrev} isDisabled={desde === 0}>
                        Anterior
                    </Button>
                    <Text>
                        Página {Math.floor(desde / limite) + 1} de {Math.ceil(total / limite) || 1}
                    </Text>
                    <Button onClick={handleNext} isDisabled={desde + limite >= total}>
                        Siguiente
                    </Button>
                </Flex>

                <UserFormModal
                    isOpen={isOpen}
                    onClose={onClose}
                    userSaved={handleUserSaved}
                    userToEdit={selectedUser}
                />
            </MotionBox>

        </>
    );
};

export default UsersPage;