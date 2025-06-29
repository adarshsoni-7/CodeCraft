import { Link, useNavigate } from "react-router-dom";
import usePost from "../context/usePost";
import useUser from "../context/useUser";
import axios from "axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { setPost } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const category = e.target.category.value;
    const image = e.target.image.value;
    const newPost = { title, content, category, coverImage:image, postedBy: user._id };
    setPost(newPost);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/publish`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        const data = await response.data;
        console.log("Blog post created successfully:", data);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error creating blog post:", error.message);
    }
    e.target.reset(); // Reset the form after submission
  };
  return (
    <div className="p-6">
      <div>
        <Link to={"/home"} className="text-3xl font-bold">
          CodeCraft
        </Link>
      </div>
      <h1 className="text-2xl font-bold my-8">Create a New Blog Post</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write your blog content here"
            rows="10"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Hobbies">Hobbies</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Technology">Technology</option>
            <option value="Travel & Culture">Travel & Culture</option>
            <option value="Pet Care">Pet Care</option>
            <option value="Science">Science</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Social Issues">Social Issues</option>
            <option value="Automotive">Automotive</option>
            <option value="Gaming">Gaming</option>
            <option value="Work Life">Work Life</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="image">
            Featured Image URL
          </label>
          <input
            type="url"
            id="image"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
