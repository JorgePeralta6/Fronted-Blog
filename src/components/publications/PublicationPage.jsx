import { useState, useEffect } from "react";
import { getPublications, addComment } from "../../services";
import { Box, Text, Button, VStack, HStack, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const PublicationsPage = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newComments, setNewComments] = useState({});

    const fetchPublications = async () => {
        setIsLoading(true);
        const res = await getPublications();
        setIsLoading(false);

        if (res?.error) {
            console.error("Error al obtener publicaciones:", res.msg);
            return;
        }

        setPublications(res.data?.publication || []);
    };

    useEffect(() => {
        fetchPublications();
    }, []);

    const handleAddComment = async (publicationId) => {
        const commentText = newComments[publicationId]?.trim();
        if (!commentText) {
            return toast.error("El comentario no puede estar vacío");
        }

        const res = await addComment(publicationId, {
            comment: commentText,
            author: "ID_DEL_AUTOR" // Cambia esto por el ID del usuario autenticado
        });

        if (res?.error) {
            return toast.error(res.msg);
        }

        toast.success("Comentario agregado correctamente");

        // Actualizar comentarios localmente
        setPublications((prev) => 
            prev.map((pub) =>
                pub._id === publicationId
                    ? { ...pub, comments: [...pub.comments, res.data.comment] }
                    : pub
            )
        );

        setNewComments((prev) => ({ ...prev, [publicationId]: "" }));
    };

    const handleCommentChange = (publicationId, text) => {
        setNewComments((prev) => ({
            ...prev,
            [publicationId]: text
        }));
    };

    return (
        <Box p={4}>
            <Text fontSize="2xl" mb={4}>Publicaciones</Text>
            {isLoading ? (
                <Text>Cargando publicaciones...</Text>
            ) : (
                <VStack spacing={4} align="stretch">
                    {publications.length > 0 ? (
                        publications.map((pub) => (
                            <Box key={pub._id} p={4} shadow="md" borderWidth="1px" rounded="md">
                                <Text fontSize="lg" fontWeight="bold">{pub.title}</Text>
                                <Text>{pub.maintext}</Text>
                                <Text mt={2} fontSize="sm" color="gray.500">Autor: {pub.author.name}</Text>
                                
                                <Box mt={4}>
                                    <Text fontSize="md" mb={2}>Comentarios:</Text>
                                    {pub.comments.length > 0 ? (
                                        pub.comments.map((comment, index) => (
                                            <Text key={index} fontSize="sm">- {comment.comment}</Text>
                                        ))
                                    ) : (
                                        <Text fontSize="sm">No hay comentarios aún.</Text>
                                    )}

                                    <HStack mt={2}>
                                        <Input
                                            placeholder="Agregar un comentario..."
                                            value={newComments[pub._id] || ""}
                                            onChange={(e) => handleCommentChange(pub._id, e.target.value)}
                                        />
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => handleAddComment(pub._id)}
                                        >
                                            Comentar
                                        </Button>
                                    </HStack>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Text>No hay publicaciones disponibles.</Text>
                    )}
                </VStack>
            )}
        </Box>
    );
};

export default PublicationsPage;
