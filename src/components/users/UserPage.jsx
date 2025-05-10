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

    const handleDeleteUser = async (id) => {
        let res = await deleteUser(id);

        if (res?.error) {
            return toast.error(res.msg);
        }

        toast.success('User deleted successfully!');
        onClose();
        await getUsers({ limite, desde });
    };

    return (
        <MotionBox minH="100vh" p={4}>
            <Flex justifyContent="flex-end" alignItems="center" px={8}>
                <Box p={6} width='500px'>
                    <UserSearch onSearch={(term) => setSearchTerm(term)} />
                </Box>
                <Button onClick={() => handleEditUser(null)}>Add User</Button>
            </Flex>

            {isFetching ? (
                "Loading users..."
            ) : filteredUsers.length > 0 ? (
                <Users
                    users={filteredUsers}
                    handleEditUser={handleEditUser}
                    handleDeleteUser={handleDeleteUser}
                />
            ) : (
                "No users found."
            )}

            <UserFormModal
                isOpen={isOpen}
                onClose={onClose}
                userToEdit={selectedUser}
            />
        </MotionBox>
    );
};

export default UsersPage;

