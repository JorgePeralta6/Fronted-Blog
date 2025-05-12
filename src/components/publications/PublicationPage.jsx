import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { getPublications } from "../../services";
import { Box, Text, Button, VStack, HStack, Input } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useComment } from "../../shared/hooks/useComment";

const PublicationsPage = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addComment } = useComment();
    const { control, handleSubmit, reset, setValue } = useForm();

    // Obtener publicaciones desde el backend
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

    // Agregar un comentario a una publicación específica
    const onSubmit = async (data) => {
        const { publicationId, commentText } = data;
        console.log(data);
        

        if (!commentText?.trim()) {
            return toast.error("El comentario no puede estar vacío");
        }

        const author = "UsuarioDemo"; // Reemplaza con tu lógica de autenticación

        const newComment = await addComment( {
            comment: commentText.trim(),
            publicationId,
            author,
        });

        if (!newComment) return;

        toast.success("Comentario agregado correctamente");

        setPublications((prev) =>
            prev.map((pub) =>
                pub._id === publicationId
                    ? {
                          ...pub,
                          comments: [...pub.comments, newComment],
                      }
                    : pub
            )
        );

        // Limpiar solo el input del comentario actual
        reset({ [`comment-${publicationId}`]: "" });
        fetchPublications();
    };

    return (
        <Box p={4}>
            <Text fontSize="2xl" mb={4}>
                Publicaciones
            </Text>
            {isLoading ? (
                <Text>Cargando publicaciones...</Text>
            ) : (
                <VStack spacing={4} align="stretch">
                    {publications.length > 0 ? (
                        publications.map((pub) => (
                            <Box
                                key={pub._id}
                                p={4}
                                shadow="md"
                                borderWidth="1px"
                                rounded="md"
                            >
                                <Text fontSize="lg" fontWeight="bold">
                                    {pub.title}
                                </Text>
                                <Text>{pub.maintext}</Text>
                                <Text mt={2} fontSize="sm" color="gray.500">
                                    Autor: {pub.author}
                                </Text>

                                <Box mt={4}>
                                    <Text fontSize="md" mb={2}>
                                        Comentarios:
                                    </Text>
                                    {pub.comments?.length > 0 ? (
                                        pub.comments.map((comment, index) => (
                                            <Text key={index} fontSize="sm">
                                                - <strong>{comment.author || "Anónimo"}:</strong>{" "}
                                                {comment.comment}
                                            </Text>
                                        ))
                                    ) : (
                                        <Text fontSize="sm">
                                            No hay comentarios aún.
                                        </Text>
                                    )}

                                    <form
                                        onSubmit={handleSubmit((formData) =>
                                            onSubmit({
                                                publicationId: pub._id,
                                                commentText: formData[`comment-${pub._id}`],
                                            })
                                        )}
                                    >
                                        <HStack mt={2}>
                                            <Controller
                                                name={`comment-${pub._id}`}
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <Input
                                                        placeholder="Agregar un comentario..."
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            <Button type="submit" colorScheme="blue">
                                                Comentar
                                            </Button>
                                        </HStack>
                                    </form>
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
