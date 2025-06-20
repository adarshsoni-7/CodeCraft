const PostModel = require("../models/post.model");

module.exports.LikePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    // If already liked

    if (post.likedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "You already liked this post" });
    }


    post.likes += 1;

    post.likedBy.push(req.user._id);

    await post.save();

    
    res.status(200).json({ message: "Post liked successfully" });

  }
  catch (err) {
    res.status(500).json(err);
  }
};

module.exports.DislikePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    // If not liked yet
    
    if (!post.likedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "You haven't liked this post yet" });
    }


    post.likes -= 1;

    post.likedBy = post.likedBy.filter((userId) => userId.toString() !== req.user._id.toString());

    await post.save();

    console.log(post);
    res.status(200).json({ message: "Post disliked successfully" });

  }
  catch (err) {
    res.status(500).json(err);
  }
};

