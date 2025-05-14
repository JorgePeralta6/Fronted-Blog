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
    IconButton,
    Grid,
    Center,
    useColorModeValue,
    Heading,
    Image
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
                    ? { ...pub, comments: [...pub.comments, newComment] }
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
            <Text fontSize="3xl" fontWeight="bold" mb={6}>Publicaciones</Text>

            {isLoading ? (
                <Text>Cargando publicaciones...</Text>
            ) : (
                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                    {publications.map((pub) => (
                        <Box key={pub._id} p={6} bg={useColorModeValue("white", "gray.800")} boxShadow="2xl" rounded="lg">
                            <Image rounded="lg" height={230} width="full" objectFit="cover" src={pub.image || "https://via.placeholder.com/300"} alt="#" />
                            <Stack pt={5} spacing={3}>
                                <Heading fontSize="xl">{pub.title}</Heading>
                                <Text>{pub.maintext}</Text>
                                <Text color="gray.500">Autor: {pub.author}</Text>
                                <Divider my={4} />
                                <VStack align="start">
                                    {pub.comments.map((comment) => (
                                        <HStack key={comment._id} justify="space-between" w="full">
                                            <Text>{comment.author}: {comment.comment}</Text>
                                            <IconButton
                                                aria-label="Eliminar comentario"
                                                icon={<Trash />}
                                                onClick={() => handleDeleteComment(comment._id)}
                                            />
                                        </HStack>
                                    ))}
                                </VStack>
                                <form onSubmit={handleSubmit((formData) => onSubmit({ publicationId: pub._id, commentText: formData[`comment-${pub._id}`], commentAuthor: formData[`author-${pub._id}`] }))}>
                                    <Stack spacing={3} mt={3}>
                                        <Controller name={`author-${pub._id}`} control={control} defaultValue="" render={({ field }) => <Input placeholder="Autor del comentario" {...field} />} />
                                        <Controller name={`comment-${pub._id}`} control={control} defaultValue="" render={({ field }) => <Input placeholder="Agregar un comentario..." {...field} />} />
                                        <Button type="submit" colorScheme="teal">Comentar</Button>
                                    </Stack>
                                </form>
                            </Stack>
                        </Box>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default PublicationsPage;
