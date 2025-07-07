import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import useUser from "../context/useUser";
import timeAgo from "../utils/ExactTimeRead";
import CommentBlog from "../components/CommentBlog";
import useCommentModal from "../context/useCommentModal";

const SinglePost = () => {
  const { postId } = useParams();
  const { user, setUser } = useUser();
  const [post, setPost] = useState(null);
  const { isCommentPanelOpen, setIsCommentPanelOpen } = useCommentModal();

  useEffect(() => {
    const fetchPostAndIncrementView = async () => {
      if (!postId) return;

      const token = localStorage.getItem("token");

      try {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/${postId}/view`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        if (err.response?.data?.message !== "You already viewed this blog") {
          console.error("Error incrementing view:", err);
        }
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err.message);
      }
    };

    fetchPostAndIncrementView();
  }, [postId]);

  const fetchLike = async () => {
    try {
      if (!postId) {
        console.error("postId is undefined when liking!");
        return;
      }

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedPost = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
      );

      setPost(updatedPost.data);
    } catch (err) {
      console.error("Failed to fetch likes:", err);
    }
  };

  if (!post)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-[1.5px] border-gray-400 border-t-black rounded-full animate-spin"></div>
      </div>
    );

  const handleFollowButton = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/${post?.postedBy?._id}/follow`,
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        followings: [...prev.followings, post?.postedBy?._id],
      }));
    } catch (error) {
      console.error("Error following user:", error.response?.data || error);
    }
  };

  const handleUnFollowButton = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/${
          post?.postedBy?._id
        }/unfollow`,
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // This loop skips the id which we want to unfollow
      setUser((prev) => ({
        ...prev,
        followings: prev.followings.filter((id) => id !== post?.postedBy?._id),
      }));
    } catch (error) {
      console.error("Error following user:", error.response?.data || error);
    }
  };

  return (
    <div className="relative h-[100vh]">
      {isCommentPanelOpen && <CommentBlog />}

      <div className="relative -left-10 mt-4">
        <div className="flex justify-around items-center">
          <div>
            <Link to={"/home"} className="text-3xl font-bold mb-24">
              CodeCraft
            </Link>
          </div>
          <div className="flex justify-between items-center gap-20   text-[14px] relative right-[10%]">
            <NavLink
              to={"/blogs"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              Blogs
            </NavLink>
            <NavLink
              to={"/categories"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              Categories
            </NavLink>
            <NavLink
              to={"/about"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              About
            </NavLink>
            <NavLink
              to={"/contact"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              Contact
            </NavLink>
          </div>
          <Link to={"/users/profile"} className="absolute right-4">
            <img
              className="h-12 w-12 rounded-full relative"
              src={user?.profilePicture || "/default-profile.jpg"}
              alt="Profile"
            />
            <p className="text-xs font-medium absolute text-center">
              {user?.fullname}
            </p>
          </Link>
        </div>
      </div>

      <div className="p-6 max-w-3xl mx-auto relative h-[100vh]">
        <h1 className="text-xl font-bold mb-2 w-[80%]">{post.title}</h1>
        {user?._id === post?.postedBy?._id ? (
          <Link to={`/posts/${postId}/delete`}>
            <button className="absolute top-[3%] right-[5%] tracking-wider border-[1px] border-red-300 text-sm font-semibold p-3 px-6 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-red-600 ">
              Delete
            </button>
          </Link>
        ) : (
          <button
            onClick={() =>
              user?.followings?.includes(post?.postedBy?._id)
                ? handleUnFollowButton()
                : handleFollowButton()
            }
            className="absolute top-5 right-[5%] tracking-wider border-[1px] border-blue-300 text-sm font-semibold p-3 px-6 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-blue-600 "
          >
            {user?.followings?.includes(post?.postedBy?._id)
              ? "Following"
              : "Follow"}
          </button>
        )}

        <div className="relative h-[80vh] mt-20">
          <span className="right-[20%] absolute bg-white rounded-full py-1 px-2 text-[#161515] text-[11px] m-2 tracking-wide font-semibold">
            {post.category}
          </span>
          <img
            src={post.coverImage || "/default-cover.jpg"}
            alt="Cover"
            className="rounded-xl mb-6  h-[50%] w-[80%] object-cover mt-[7vh]"
          />
          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <span onClick={fetchLike} className="mr-4 cursor-pointer">
              <i
                className={`mr-1 text-lg ${
                  post?.likedBy.includes(user?._id)
                    ? "ri-heart-fill text-red-500"
                    : "ri-heart-line"
                }`}
              ></i>
              {post.likes}
            </span>
            <span className="mr-4">
              <Link
                to={`/posts/${post._id}/comments`}
                onClick={() => setIsCommentPanelOpen(true)}
              >
                <i className="ri-message-line mr-1 text-lg"></i>
                Comment
              </Link>
            </span>
            <span>
              <i className="ri-time-line mr-1 text-lg"></i>
              {timeAgo(post.createdAt)}
            </span>
            <span>
              <i className="ri-eye-line mr-1 text-lg"></i>
              {post.views}
            </span>
          </div>
          <p className="text-lg leading-7">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
