import { useState } from "react";
import toast from "react-hot-toast";
import {
    addComment as addCommentRequest,
    deleteComment as deleteCommentRequest,
    updateComment as updateCommentRequest
} from "../../services";

export const useComment = () => {
    const [comments, setComments] = useState([]);

    const addComment = async (commentData) => {
        const result = await addCommentRequest(commentData);

        if (result?.error) {
            return toast.error(result.msg || "No se pudo agregar el comentario");
        }

        toast.success("Comentario agregado con éxito");
        window.location.reload();
        setComments((prev) => [...prev, result.data.comment]);

        return result.data.comment;
    };

    const deleteComment = async (publicationId, commentId) => {
        const result = await deleteCommentRequest(publicationId, commentId);

        if (result?.error) {
            toast.error(result.msg || "No se pudo eliminar el comentario");
            return false;
        }

        toast.success("Comentario eliminado correctamente");

        setComments((prev) => prev.filter(comment => comment._id !== commentId));

        return true;
    };

    const updateComment = async (id, updatedComment) => {
        const result = await updateCommentRequest(id, updatedComment);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || "No se pudo actualizar el comentario");
        }

        toast.success("Comentario actualizado correctamente");
        return result.data; // Retorna el comentario actualizado
    };

    return {
        comments,
        addComment,
        deleteComment,
        updateComment
    };
};  