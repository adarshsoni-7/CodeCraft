import { useContext } from "react";
import { CommentModalContext } from "../context/CommentModalContext";

const useCommentModal = () => {
    return useContext(CommentModalContext)
};

export default useCommentModal;
