import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const storedPost = localStorage.getItem("post");
    if (storedPost) {
      setPost(JSON.parse(storedPost));
    }
  }, []);

  // ✅ Whenever user changes, update localStorage
  useEffect(() => {
    if (post) {
      localStorage.setItem("post", JSON.stringify(post));
    } else {
      localStorage.removeItem("post");
    }
  }, [post]);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};
