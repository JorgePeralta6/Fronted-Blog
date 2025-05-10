import { SimpleGrid } from "@chakra-ui/react";
import ClientCard from "./ClientCard";
import { useNavigate } from "react-router";

export const Clients = ({ clients, handleEditClient, handleDeleteClient }) => {

    return (
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={10} p={6} >
            {clients.map((client) => (
                <ClientCard
                    key={client._id}
                    client={client}
                    handleEditClient={handleEditClient}
                    handleDeleteClient={handleDeleteClient}
                />
            ))}

        </SimpleGrid>
    )
}