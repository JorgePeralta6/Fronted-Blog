import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Text,
    HStack,
    IconButton,
    Grid,
} from "@chakra-ui/react";
import { List, Grid as GridIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useComment } from "../../shared/hooks/useComment";
import NavBar from "../dashboard/Navbar";
import PublicationCard from "./PublicationCard";
import PublicationModal from "./PublicationModal";
import { getPublications, getPublicationsByCourse } from "../../services";

const PublicationsPage = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addComment, deleteComment, updateComment } = useComment();
    const { control, handleSubmit, reset } = useForm();
    const [selectedPublication, setSelectedPublication] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [viewMode, setViewMode] = useState(
        () => localStorage.getItem("viewMode") || "grid"
    );

    // Disclosure states for modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);

    const fetchPublications = async (course = null) => {
        setIsLoading(true);
        const res = course
            ? await getPublicationsByCourse(course)
            : await getPublications();
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

    const handleOpenModal = (publication) => {
        setSelectedPublication(publication);
        setIsModalOpen(true);
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        localStorage.setItem("viewMode", mode);
    };

    const handleAddComment = async ({ publicationId, commentText, commentAuthor }) => {
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

        reset({ commentAuthor: "", commentText: "" });
        setIsCommentModalOpen(false);
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

    const handleUpdateCommentClick = async () => {
        if (!selectedComment?.comment.trim()) {
            return toast.error("El comentario no puede estar vacío");
        }

        const updatedComment = await updateComment(selectedComment._id, {
            comment: selectedComment.comment.trim(),
        });

        if (updatedComment) {
            setPublications((prev) =>
                prev.map((pub) =>
                    pub._id === selectedPublication._id
                        ? {
                            ...pub,
                            comments: pub.comments.map((c) =>
                                c._id === selectedComment._id
                                    ? { ...c, comment: updatedComment.comment }
                                    : c
                            ),
                        }
                        : pub
                )
            );
            setIsEditCommentModalOpen(false);
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

                {isLoading ? (
                    <Text>Cargando publicaciones...</Text>
                ) : (
                    <Grid
                        templateColumns={viewMode === "grid" ? "repeat(auto-fill,minmax(300px,1fr))" : "1fr"}
                        gap={6}
                    >
                        {publications.map((pub) => (
                            <PublicationCard
                                key={pub._id}
                                pub={pub}
                                viewMode={viewMode}
                                onOpenModal={handleOpenModal}
                            />
                        ))}
                    </Grid>
                )}

                <PublicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    publication={selectedPublication}
                    addComment={handleAddComment}
                    deleteComment={handleDeleteComment}
                    updateComment={handleUpdateCommentClick}
                    onOpenCommentModal={() => setIsCommentModalOpen(true)}
                    isCommentModalOpen={isCommentModalOpen}
                    onCloseCommentModal={() => setIsCommentModalOpen(false)}
                    isEditCommentModalOpen={isEditCommentModalOpen}
                    onOpenEditCommentModal={() => setIsEditCommentModalOpen(true)}
                    onCloseEditCommentModal={() => setIsEditCommentModalOpen(false)}
                    selectedComment={selectedComment}
                    setSelectedComment={setSelectedComment}
                    handleUpdateComment={handleUpdateCommentClick}
                    reset={reset}
                    control={control}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </>
    );
};

export default PublicationsPage;