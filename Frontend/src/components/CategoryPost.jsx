import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const CategoryPost = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]); 
  
    const timeAgo = (dateString) => {
      const now = new Date();
      const postDate = new Date(dateString);
      const diffInSeconds = Math.floor((now - postDate) / 1000);
  
      if (diffInSeconds < 60) return "Just now";
      const mins = Math.floor(diffInSeconds / 60);
      if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
      const days = Math.floor(hours / 24);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    };
  

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      const categorisedPosts = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts?category=${categoryName}`
      );
      console.log(categorisedPosts.data);

      setPosts(categorisedPosts.data);
    };
    fetchCategoryPosts();
  }, [categoryName]);
  return (
    <div>
      <div className="h-min-[40vh] bg-[#e6e2e2e8] p-24 py-36 -mt-3 mb-36 relative">
        <Link
          to={"/home"}
          className="text-3xl font-bold mb-24 absolute top-8 left-10"
        >
          CodeCraft
        </Link>
        <h1 className="text-8xl font-extrabold  my-8 tracking-tighter">
          {categoryName}
        </h1>
      </div>

      <div className="my-5 flex flex-wrap gap-6 justify-between p-6">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="relative w-[60vh]">
              {/* Category Badge */}
              <span className="absolute bg-white rounded-full py-1 px-2 text-[#161515] text-[11px] m-2 tracking-wide shadow-md">
                {post.category}
              </span>

              {/* Thumbnail */}
              <img
                className="h-[50vh] w-[60vh] object-cover rounded-xl"
                src={post.coverImage || "/default-thumbnail.jpg"} // fallback image
                alt={post.title}
              />

              {/* Content */}
              <div className="mt-4">
                <p className="text-xl font-semibold mb-3">
                  {post.title.length > 60
                    ? post.title.slice(0, 60) + "..."
                    : post.title}
                </p>

                {/* Date & Read Time */}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-calendar-line"></i>
                  <span> {new Date(post.createdAt).toDateString()}</span>
                  <i className="ri-time-line ml-3"></i>
                  <span>{timeAgo(post.createdAt)}</span>
                </div>

                {/* Read More Button */}
                <button className="mt-4 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-700 hover:text-white hover:bg-black">
                  Read More{" "}
                  <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No posts found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPost;
