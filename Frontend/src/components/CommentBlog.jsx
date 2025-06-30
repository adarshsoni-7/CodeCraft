import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePost from "../context/usePost";
import axios from "axios";

const CommentBlog = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // destructure here
  const { post, setPost } = usePost();
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      // If you want to use postId from URL params:
      

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/${postId}/comments`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Comment added:", response.data);

      // Update local state with the new comment
      setPost((prev) => ({...prev, comments: [...(prev.comments || []), comment],
      }));

      setComment("");
      navigate(-1);
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <label htmlFor="comment" className="block text-lg font-medium mb-2">
        Leave a Comment
      </label>
      <textarea
        id="comment"
        className="w-full max-w-xl border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
        rows="4"
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmitComment}
        disabled={submitting}
        className="mx-4 bg-black text-white font-medium py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Comment"}
      </button>
    </div>
  );
};

export default CommentBlog;
