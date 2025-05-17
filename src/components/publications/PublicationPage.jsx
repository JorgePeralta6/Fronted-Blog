import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { getPublications, getPublicationsByCourse } from "../../services";
import {
    Box,
    Text,
    Button,
    VStack,
    HStack,
    Input,
    Divider,
    Stack,
    IconButton,
    Grid,
    useColorModeValue,
    Heading,
    Image,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, useDisclosure
} from "@chakra-ui/react";
import { Trash, List, Grid as GridIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useComment } from "../../shared/hooks/useComment";
import NavBar from '../dashboard/Navbar'

const PublicationsPage = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addComment, deleteComment, updateComment } = useComment();
    const { control, handleSubmit, reset } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isCommentModalOpen, onOpen: onOpenCommentModal, onClose: onCloseCommentModal } = useDisclosure();
    const [selectedPublication, setSelectedPublication] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const { isOpen: isEditCommentModalOpen, onOpen: onOpenEditCommentModal, onClose: onCloseEditCommentModal } = useDisclosure();
    const [viewMode, setViewMode] = useState(() => localStorage.getItem("viewMode") || "grid");


    const handleOpenModal = (publication) => {
        setSelectedPublication(publication);
        onOpen();
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        localStorage.setItem("viewMode", mode); // Guardar en localStorage
    };

    // Fetch publications
    const fetchPublications = async (course = null) => {
        setIsLoading(true);

        const res = course ? await getPublicationsByCourse(course) : await getPublications();

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

    const handleEditComment = (comment) => {
        setSelectedComment(comment);
        onOpenEditCommentModal();
    };

    // Función para actualizar el comentario
    const handleUpdateComment = async () => {
        if (!selectedComment?.comment.trim()) {
            return toast.error("El comentario no puede estar vacío");
        }

        const updatedComment = await updateComment(selectedComment._id, {
            comment: selectedComment.comment.trim()
        });

        if (updatedComment) {
            setPublications((prev) =>
                prev.map((pub) =>
                    pub._id === selectedPublication._id
                        ? {
                            ...pub,
                            comments: pub.comments.map((c) =>
                                c._id === selectedComment._id ? { ...c, comment: updatedComment.comment } : c
                            ),
                        }
                        : pub
                )
            );
            onCloseEditCommentModal();
        }
    };


    return (
        <>
            <NavBar onCourseSelect={fetchPublications} />
            <Box p={6}>
                <HStack justifyContent="flex-end" mb={4} w="full">
                    <HStack>
                        <IconButton
                            icon={<GridIcon />}
                            onClick={() => handleViewModeChange("grid")}
                            colorScheme={viewMode === "grid" ? "blue" : "gray"}
                        />
                        <IconButton
                            icon={<List />}
                            onClick={() => handleViewModeChange("list")}
                            colorScheme={viewMode === "list" ? "blue" : "gray"}
                        />
                    </HStack>
                </HStack>
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
                                src={selectedPublication?.image}
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
                                        <HStack key={index} p={2} rounded="md" w="full" justify="space-between">
                                            <Text onClick={() => handleEditComment(comment)} cursor="pointer">
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
                <Modal isOpen={isEditCommentModalOpen} onClose={onCloseEditCommentModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Editar Comentario</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                value={selectedComment?.comment || ""}
                                onChange={(e) =>
                                    setSelectedComment((prev) => ({
                                        ...prev,
                                        comment: e.target.value,
                                    }))
                                }
                                placeholder="Editar tu comentario..."
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={handleUpdateComment}>
                                Guardar Cambios
                            </Button>
                            <Button ml={3} onClick={onCloseEditCommentModal}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {isLoading ? (
                    <Text>Cargando publicaciones...</Text>
                ) : viewMode === "grid" ? (
                    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                        {publications.map((pub) => (
                            <Box key={pub._id} p={6} bg={useColorModeValue("white", "gray.800")} boxShadow="2xl" rounded="lg">
                                <Image rounded="lg" height={250} width="full" objectFit="cover" src={pub.image} alt="#" />
                                <Stack pt={5} spacing={3}>
                                    <Heading fontSize="xl">{pub.title}</Heading>
                                    <Text>{pub.maintext}</Text>
                                    <Text color="gray.500">Curso: {pub.course}</Text>
                                    <Text color="gray.500">Autor: {pub.author}</Text>
                                    <Divider my={4} />
                                    <Button onClick={() => handleOpenModal(pub)} colorScheme="blue" size="sm">
                                        Ver más
                                    </Button>
                                </Stack>
                            </Box>
                        ))}
                    </Grid>
                ) : (
                    <VStack spacing={4} align="start">
                        {publications.map((pub) => (
                            <Box key={pub._id} p={4} bg={useColorModeValue("white", "gray.800")} boxShadow="2xl" rounded="lg" w="full">
                                <HStack align="start">
                                    <Image rounded="lg" height={100} width={100} objectFit="cover" src={pub.image} alt="#" />
                                    <Stack spacing={2} flex={1}>
                                        <Heading fontSize="lg">{pub.title}</Heading>
                                        <Text>{pub.maintext}</Text>
                                        <Text color="gray.500">Curso: {pub.course}</Text>
                                        <Text color="gray.500">Autor: {pub.author}</Text>
                                        <Button onClick={() => handleOpenModal(pub)} colorScheme="blue" size="sm">
                                            Ver más
                                        </Button>
                                    </Stack>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>
                )}
            </Box>
        </>
    );
};

export default PublicationsPage;