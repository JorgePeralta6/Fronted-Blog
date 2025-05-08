import { SimpleGrid } from "@chakra-ui/react";

import { useNavigate } from "react-router";
import UserCard from "./userCard";

export const Users = ({ users, handleEditUser, handleDeleteUser }) => {

    return (
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={10} p={6} >
            {users.map((user) => (
                <UserCard
                    key={user._id}
                    user={user}
                    handleEditUser={handleEditUser}
                    handleDeleteUser={handleDeleteUser}
                />
            ))}

        </SimpleGrid>
    )
}