const PostModel = require("../models/post.model");
const PostService = require("../services/post.service");
const { validationResult } = require("express-validator");

module.exports.publishPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }

  try {
    const { title, content, coverImage, category, postedBy } = req.body;

    const publishedPost = await PostService.publishPost({
      title,
      content,
      coverImage,
      category,
      postedBy,
    });

    res.status(201).json(publishedPost);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// To see the specific blog post by id
module.exports.getSinglePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate(
      "postedBy",
      "fullname profilePicture isAdmin"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getSinglePostByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await PostModel.find({ postedBy: userId })
      .populate("postedBy", "fullname  profilePicture")
      .sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    await post.deleteOne();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports.deleteAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found to delete" });
    }
    const deletedPosts = await PostModel.deleteMany({});
    if (deletedPosts.deletedCount === 0) {
      return res.status(404).json({ message: "No posts found to delete" });
    }
    return res.status(200).json({ message: "All posts deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
