import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoriesButton from "../CategoriesButton";
import axios from "axios";
import usePost from "../../context/usePost";

const categoryList = [
  "Hobbies",
  "Gaming",
  "Automotive",
  "Pet Care",
  "Science",
  "Work Life",
  "Social Issues",
  "Entertainment",
  "Travel & Culture",
  "Technology",
  "Lifestyle",
];

const CategoryPage = () => {
  const {post, setPost} = usePost();
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    const fetchCategoryWisePosts = async () => {
      const allPosts = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts`
      );
      setPost(allPosts.data); // .data to get the actual array
    };
    fetchCategoryWisePosts();
  }, []);

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

  return (
    <div>
      {/* Hero Section */}
      <div className="h-min-[40vh] bg-[#e6e2e2e8] p-24 py-32 -mt-3 mb-36 relative">
        <Link
          to={"/home"}
          className="text-3xl font-bold mb-24 absolute top-8 left-10"
        >
          CodeCraft
        </Link>
        <h1 className="text-8xl font-extrabold tracking-tighter my-5">
          All Categories
        </h1>
      </div>

      {/* Category Buttons */}
      <CategoriesButton />

      {/* Posts Grouped by Category */}
      <div className="p-12">
        {Array.isArray(post) && categoryList.map((category) => {
          const filteredPosts = post.filter(
            (post) => post.category === category
          );

          if (filteredPosts.length === 0) return null;

          return (
            <div key={category} className="mb-14 relative">
              <h2 className="text-4xl font-extrabold mb-12 tracking-tight">
                {category}
              </h2>
              {filteredPosts.length > 3 && (
                <button
                  onClick={() => toggleCategory(category)}
                  className="absolute z-40 right-10 top-8 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold px-5 py-3 rounded-xl transition-all duration-[.7s] hover:text-white hover:bg-black pr-8"
                >
                  {expandedCategories[category] ? "View Less" : "View More"}
                  <i className="ri-arrow-right-fill text-[13px] absolute ml-2"></i>
                </button>
              )}
              <div className="flex flex-wrap gap-8">
                {(expandedCategories[category]
                  ? filteredPosts
                  : filteredPosts.slice(0, 3)
                ).map((post) => (
                  <Link to={`/posts/${post._id}`} key={post._id} className="relative w-[60vh]">
                    <span className="absolute bg-white rounded-full py-1 px-2 text-[#161515] text-[11px] m-2 tracking-wide shadow-md">
                      {post.category}
                    </span>
                    <img
                      className="h-[50vh] w-[60vh] object-cover rounded-xl"
                      src={post.coverImage || "/default-thumbnail.jpg"}
                      alt={post.title}
                    />
                    <div className="mt-4">
                      <p className="text-xl font-semibold mb-3">
                        {post.title.length > 60
                          ? post.title.slice(0, 60) + "..."
                          : post.title}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <i className="ri-calendar-line"></i>
                        <span>
                          {new Date(post.createdAt).toDateString()}
                        </span>
                        <i className="ri-time-line ml-3"></i>
                        <span>{timeAgo(post.createdAt)}</span>
                      </div>
                      <Link to={`/posts/${post._id}`}>
                        <button className="mt-4 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-700 hover:text-white hover:bg-black">
                          Read More{" "}
                          <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
                        </button>
                      </Link>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
