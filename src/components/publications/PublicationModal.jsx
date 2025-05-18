import React, { useState } from "react";
import {
    Text,
    Image,
    Divider,
    Heading,
    VStack,
    HStack,
    IconButton,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Stack,
} from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

const PublicationModal = ({
    isOpen,
    onClose,
    publication,
    addComment,
    deleteComment,
    onOpenCommentModal,
    isCommentModalOpen,
    onCloseCommentModal,
    isEditCommentModalOpen,
    onOpenEditCommentModal,
    onCloseEditCommentModal,
    selectedComment,
    setSelectedComment,
    handleUpdateComment,
    control,
    handleSubmit,
}) => {
    if (!publication) return null;

    const onSubmit = (data) =>
        handleSubmit((formData) =>
            addComment({
                publicationId: publication._id,
                commentText: formData.commentText,
                commentAuthor: formData.commentAuthor,
            })(data)
        );

    return (
        <>
            {/* Modal Ver Más */}
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{publication.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                            {publication.maintext}
                        </Text>
                        <Image
                            rounded="lg"
                            height={200}
                            width="100%"
                            objectFit="cover"
                            src={publication.image}
                            alt="Imagen de la publicación"
                            mb={4}
                        />
                        <Text>
                            <strong>Curso:</strong> {publication.course}
                        </Text>
                        <Text>
                            <strong>Autor:</strong> {publication.author}
                        </Text>
                        <Text>
                            <strong>Fecha-Publicada:</strong>{" "}
                            {new Date(publication.createdAt).toLocaleDateString()}
                        </Text>
                        <Divider my={4} />

                        <Heading size="md" mt={4}>
                            Comentarios
                        </Heading>
                        <VStack align="start" mt={2} spacing={2} w="full">
                            {publication.comments?.length > 0 ? (
                                publication.comments.map((comment, index) => (
                                    <VStack
                                        key={index}
                                        p={2}
                                        rounded="md"
                                        w="full"
                                        align="start"
                                        spacing={1}
                                    >
                                        <HStack w="full" justify="space-between">
                                            <Text
                                                onClick={() => {
                                                    setSelectedComment(comment);
                                                    onOpenEditCommentModal();
                                                }}
                                                cursor="pointer"
                                            >
                                                <strong>{comment.author}:</strong> {comment.comment}
                                            </Text>
                                            <IconButton
                                                aria-label="Eliminar comentario"
                                                icon={<Trash />}
                                                size="sm"
                                                onClick={() => deleteComment(comment._id)}
                                            />
                                        </HStack>
                                        <Text fontSize="xs" color="gray.500">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </Text>
                                    </VStack>
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

            {/* Modal Agregar Comentario */}
            <Modal
                blockScrollOnMount={false}
                isOpen={isCommentModalOpen}
                onClose={onCloseCommentModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar Comentario</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form
                            onSubmit={handleSubmit((formData) =>
                                addComment({
                                    publicationId: publication._id,
                                    commentText: formData.commentText,
                                    commentAuthor: formData.commentAuthor,
                                })
                            )}
                        >
                            <Stack spacing={3}>
                                <Controller
                                    name="commentAuthor"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input placeholder="Autor del comentario" {...field} />
                                    )}
                                />
                                <Controller
                                    name="commentText"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input placeholder="Comentario..." {...field} />
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

            {/* Modal Editar Comentario */}
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
        </>
    );
};

export default PublicationModal;
