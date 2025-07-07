import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePost from "../context/usePost";
import useCommentModal from "../context/useCommentModal";
import axios from "axios";
import gsap from "gsap";
import timeAgo from "../utils/ExactTimeRead";

const CommentBlog = ({ isModal }) => {
  const navigate = useNavigate();
  const { postId } = useParams(); // destructure here
  const { post, setPost } = usePost();
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { isCommentPanelOpen, setIsCommentPanelOpen } = useCommentModal();
  const modalRef = useRef(null);

  useEffect(() => {
    if (isModal) {
      if (isCommentPanelOpen) {
        gsap.to(modalRef.current, { scale: 1, opacity: 1, display: "block" });
      } else {
        gsap.to(modalRef.current, { scale: 0, opacity: 0, display: "none" });
        navigate(-1);
      }
    }
  }, [isModal, isCommentPanelOpen]);

 const handleSubmitComment = async (e) => {
  e.preventDefault();
  if (!comment.trim()) return;

  try {
    setSubmitting(true);
    const token = localStorage.getItem("token");

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

    // Instead of emptying comments, fetch fresh post
    const refreshed = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
    );
    setPost(refreshed.data);

    setComment("");
    setIsCommentPanelOpen(false);
  } catch (error) {
    console.error("Error submitting comment:", error);
  } finally {
    setSubmitting(false);
  }
};


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
        );
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    // Agar page pe khule tab fetch karo
    if (!isModal) {
      fetchPost();
    }
  }, [isModal, postId]);

  return (
    <div
      ref={modalRef}
      className={
        isModal
          ? "bg-[rgba(0,0,0,0.4)] h-[100vh] w-full z-50 fixed opacity-0 scale-0 none"
          : "relative w-full"
      }
    >
     <div className="mt-6 bg-white h-[80vh] w-[60%] -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] absolute p-12 rounded-2xl overflow-hidden">
  <i
    className="ri-close-large-line absolute right-4 top-4 text-xl cursor-pointer"
    onClick={() => setIsCommentPanelOpen(false)}
  ></i>
  
  <label htmlFor="comment" className="block text-lg font-medium mb-2">
    Leave a Comment
  </label>
  
  <input
    id="comment"
    className="w-full max-w-xl border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
    placeholder="Write your comment here..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  />
  
  <button
    onClick={handleSubmitComment}
    disabled={submitting}
    className="mx-4 bg-black text-white font-medium py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-60"
  >
    {submitting ? "Submitting..." : "Comment"}
  </button>

  {isCommentPanelOpen && (
    <div className="mt-6 overflow-y-auto h-[80%] pr-2">
     {isCommentPanelOpen && (
  <div className="mt-6 overflow-y-auto h-[60%] pr-2">
    {post?.comments?.length > 0 ? (
      post.comments.map((c) => (
        <div
          key={c._id}
          className="mb-4 border-[1px] border-gray-400 p-3 rounded-2xl"
        >
          <img
            className="w-12 h-12 object-cover"
            src={c.commentedBy?.profilePicture}
          />
          <p className="font-semibold">{c.commentedBy?.fullname}</p>
          <p className="font-medium text-xs">{c.commentedBy?.bio}</p>
          <p className="text-gray-700 mt-4 font-semibold relative">
            {c.text}{" "}
            <span className="absolute right-0 text-gray-700 text-xs">
              {timeAgo(c.createdAt)}
            </span>
          </p>
        </div>
      ))
    ) : (
      <p className="font-semibold text-2xl text-center">Be the first to comment! </p>
    )}
  </div>
)}

    </div>
  )}
</div>

    </div>
  );
};

export default CommentBlog;
