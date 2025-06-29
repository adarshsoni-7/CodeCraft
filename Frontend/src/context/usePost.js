import { useContext } from "react";
import { PostContext } from "../context/post.context";

const usePost = () => {
    return useContext(PostContext)
};

export default usePost;
