import { SimpleGrid } from "@chakra-ui/react";
import UserCard from "./UserCard";

export const Users = ({ users, handleEditUser, handleDeleteUser }) => {

    return (
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={10} p={6} >
            {users.map((user) => (
                <UserCard
                    key={user.uid}
                    user={user}
                    handleEditUser={handleEditUser}
                    handleDeleteUser={handleDeleteUser}
                />
            ))}

        </SimpleGrid>
    )
}