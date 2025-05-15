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
    Image,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, useDisclosure
} from "@chakra-ui/react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useComment } from "../../shared/hooks/useComment";
import NavBar from '../dashboard/Navbar'

const PublicationsPage = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addComment, deleteComment } = useComment();
    const { control, handleSubmit, reset } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isCommentModalOpen, onOpen: onOpenCommentModal, onClose: onCloseCommentModal } = useDisclosure();
    const [selectedPublication, setSelectedPublication] = useState(null);

    const handleOpenModal = (publication) => {
        setSelectedPublication(publication);
        onOpen();
    };

    // Fetch publications
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
        onCloseCommentModal(); // Cierra el modal de comentario
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
        <>
            <NavBar />
            <Box p={6}>
                {/* Modal de Ver Más */}
                <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedPublication?.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontWeight="bold" mb="1rem">
                                {selectedPublication?.maintext}
                            </Text>
                            <Image
                                rounded="lg"
                                height={200}
                                width="100%"
                                objectFit="cover"
                                src={selectedPublication?.image || "https://via.placeholder.com/300"}
                                alt="Imagen de la publicación"
                                mb={4}
                            />
                            <Text><strong>Curso:</strong> {selectedPublication?.course}</Text>
                            <Text><strong>Autor:</strong> {selectedPublication?.author}</Text>
                            <Divider my={4} />

                            <Heading size="md" mt={4}>Comentarios</Heading>
                            <VStack align="start" mt={2} spacing={2} w="full">
                                {selectedPublication?.comments?.length > 0 ? (
                                    selectedPublication.comments.map((comment, index) => (
                                        <HStack key={index} p={2}  rounded="md" w="full" justify="space-between">
                                            <Text>
                                                <strong>{comment.author}:</strong> {comment.comment}
                                            </Text>
                                            <IconButton
                                                aria-label="Eliminar comentario"
                                                icon={<Trash />}
                                                size="sm"
                                                onClick={() => handleDeleteComment(comment._id)}
                                            />
                                        </HStack>
                                    ))
                                ) : (
                                    <Text color="gray.500">No hay comentarios aún.</Text>
                                )}
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Cerrar
                            </Button>
                            <Button colorScheme="teal" onClick={onOpenCommentModal}>
                                Comentar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Modal de Comentar */}
                <Modal blockScrollOnMount={false} isOpen={isCommentModalOpen} onClose={onCloseCommentModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Agregar Comentario</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={handleSubmit((formData) => onSubmit({ publicationId: selectedPublication._id, commentText: formData.commentText, commentAuthor: formData.commentAuthor }))}>
                                <Stack spacing={3}>
                                    <Controller
                                        name="commentAuthor"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input
                                                placeholder="Autor del comentario"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="commentText"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input
                                                placeholder="Comentario..."
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Button colorScheme="teal" type="submit">
                                        Enviar Comentario
                                    </Button>
                                </Stack>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onCloseCommentModal}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {isLoading ? (
                    <Text>Cargando publicaciones...</Text>
                ) : (
                    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                        {publications.map((pub) => (
                            <Box key={pub._id} p={6} bg={useColorModeValue("white", "gray.800")} boxShadow="2xl" rounded="lg">
                                <Image rounded="lg" height={250} width="full" objectFit="cover" src={pub.image || "https://via.placeholder.com/300"} alt="#" />
                                <Stack pt={5} spacing={3}>
                                    <Heading fontSize="xl">{pub.title}</Heading>
                                    <Text>{pub.maintext}</Text>
                                    <Text color="gray.500">Curso: {pub.course}</Text>
                                    <Text color="gray.500">Autor: {pub.author}</Text>
                                    <Divider my={4} />
                                    <Button onClick={() => handleOpenModal(pub)} colorScheme="blue" size="sm">
                                        Ver más
                                    </Button>
                                    <VStack align="start">
                                    </VStack>
                                </Stack>
                            </Box>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
};

export default PublicationsPage;