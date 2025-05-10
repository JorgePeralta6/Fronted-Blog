import { Clients } from "./Clients";
import { useClient } from "../../shared/hooks/useClients";
import {
    useDisclosure,
    Flex,
    Button,
    Text,
    Box,
    chakra
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ClientFormModal from "./ClientFormModal";
import { deleteClient } from "../../services";
import toast from "react-hot-toast";
import { ClientSearch } from "./ClientSearch";
import { motion } from "framer-motion";

const ClientsPage = () => {
    const { getClients, clients, isFetching, total } = useClient();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedClient, setSelectedClient] = useState(null);
    const [desde, setDesde] = useState(0);
    const limite = 12;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);

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
        getClients({ limite, desde });
    }, [desde]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredClients(
                clients.filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setFilteredClients(clients || []);
        }
    }, [searchTerm, clients]);

    const handleEditClient = (client) => {
        setSelectedClient(client);
        onOpen();
    };

    const handleAddClient = () => {
        setSelectedClient(null);
        onOpen();
    };

    const handleDeleteClient = async (id) => {
        let res = await deleteClient(id);

        if (res?.error) {
            return toast.error(res.msg, {
                style: {
                    background: 'red',
                    color: 'white',
                    whiteSpace: 'pre-line',
                }
            });
        }

        toast.success('Cliente eliminado con éxito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        });

        onClose();
        await getClients({ limite, desde });
    };

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term.trim()) {
            await getClients({ limite: 0, desde: 0 });
        } else {
            await getClients({ limite, desde });
        }
    }

    const handleClientSaved = async () => {
        await getClients({ limite, desde });
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
                        <ClientSearch onSearch={handleSearch} />
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
                        onClick={handleAddClient}
                    >
                        Agregar
                    </Button>

                </Flex>

                {isFetching ? (
                    "Cargando clientes..."
                ) : filteredClients.length > 0 ? (
                    <Clients
                        clients={filteredClients}
                        handleEditClient={handleEditClient}
                        handleDeleteClient={handleDeleteClient}
                    />
                ) : (
                    "No se encontraron clientes."
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

                <ClientFormModal
                    isOpen={isOpen}
                    onClose={onClose}
                    clientSaved={handleClientSaved}
                    clientToEdit={selectedClient}
                />
            </MotionBox>

        </>
    );
};

export default ClientsPage;
