import { useState } from "react";
import toast from "react-hot-toast";
import {
    addComment as addCommentRequest,
} from "../../services";

export const useComment = () => {
    const [comments, setComments] = useState([]);

    const addComment = async ( commentData) => {
        const result = await addCommentRequest( commentData);

        if (result?.error) {
            return toast.error(result.msg || "No se pudo agregar el comentario");
        }

        toast.success("Comentario agregado con éxito");
        window.location.reload();
        setComments((prev) => [...prev, result.data.comment]);

        return result.data.comment;
    };


    return {
        comments,
        addComment
    };
};  