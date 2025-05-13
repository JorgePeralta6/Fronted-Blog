import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { getPublications } from "../../services";
import {
    Box,
    Text,
    Button,
    VStack,
    HStack,
    Input,
    Divider,
    Stack,
    Badge,
    IconButton
} from "@chakra-ui/react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useComment } from "../../shared/hooks/useComment";

const PublicationsPage = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addComment, deleteComment } = useComment();
    const { control, handleSubmit, reset } = useForm();

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

    const onSubmit = async (data) => {
        const { publicationId, commentText, commentAuthor } = data;

        if (!commentText?.trim()) {
            return toast.error("El comentario no puede estar vacío");
        }

        const newComment = await addComment({
            comment: commentText.trim(),
            publicationId,
            author: commentAuthor?.trim() || "anonymous",
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

        reset({ [`comment-${publicationId}`]: "", [`author-${publicationId}`]: "" });
    };

    const handleDeleteComment = async (publicationId, commentId) => {
        const success = await deleteComment(publicationId, commentId);

        if (success) {
            setPublications((prev) =>
                prev.map((pub) =>
                    pub._id === publicationId
                        ? { ...pub, comments: pub.comments.filter(c => c._id !== commentId) }
                        : pub
                )
            );
        }
    };

    return (
        <Box p={6}>
            <Text fontSize="3xl" fontWeight="bold" mb={6}>
                Publicaciones
            </Text>

            {isLoading ? (
                <Text>Cargando publicaciones...</Text>
            ) : (
                <VStack spacing={6} align="stretch">
                    {publications.length > 0 ? (
                        publications.map((pub) => (
                            <Box key={pub._id} p={6} borderWidth="1px" borderRadius="lg" shadow="md" bg="white">
                                <Text fontSize="2xl" fontWeight="bold">{pub.title}</Text>
                                <Text fontSize="md" mt={2} color="gray.700">{pub.maintext}</Text>
                                <Text mt={2} fontSize="sm" color="gray.500">Autor: {pub.author}</Text>
                                <Text mt={2} fontSize="sm" color="gray.500">Curso: {pub.course}</Text>

                                <Divider my={4} />

                                <Box>
                                    <Text fontSize="lg" fontWeight="semibold" mb={2}>Comentarios:</Text>

                                    <VStack align="start" spacing={2} mb={4}>
                                        {pub.comments?.length > 0 ? (
                                            pub.comments.map((comment) => (
                                                <HStack key={comment._id} w="full" justify="space-between">
                                                    <HStack>
                                                        <Badge>{comment.author}</Badge>
                                                        <Text fontSize="sm">{comment.comment}</Text>
                                                    </HStack>
                                                    <IconButton
                                                        aria-label="Eliminar comentario"
                                                        icon={<Trash />}
                                                        onClick={() => handleDeleteComment(comment._id)}
                                                    />
                                                </HStack>
                                            ))
                                        ) : (
                                            <Text fontSize="sm" color="gray.500">No hay comentarios aún.</Text>
                                        )}
                                    </VStack>

                                    <form onSubmit={handleSubmit((formData) =>
                                        onSubmit({
                                            publicationId: pub._id,
                                            commentText: formData[`comment-${pub._id}`],
                                            commentAuthor: formData[`author-${pub._id}`],
                                        })
                                    )}>
                                        <Stack spacing={3}>
                                            <Controller name={`author-${pub._id}`} control={control} defaultValue="" render={({ field }) => <Input placeholder="Autor del comentario" {...field} />} />
                                            <Controller name={`comment-${pub._id}`} control={control} defaultValue="" render={({ field }) => <Input placeholder="Agregar un comentario..." {...field} />} />
                                            <Button type="submit" bg="rgb(74, 78, 140)" color="white" _hover={{ bg: "rgb(60, 65, 120)" }}>Comentar</Button>
                                        </Stack>
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
