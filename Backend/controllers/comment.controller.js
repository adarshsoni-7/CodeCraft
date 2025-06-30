const PostModel = require("../models/post.model");
const { validationResult } = require("express-validator");



module.exports.addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.body.comment || req.body.comment.trim() === "") {
    return res.status(400).json({ message: "Comment text cannot be empty" });
  }

  try {
    const post = await PostModel.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // push comment as object
    post.comments.push({
      text: req.body.comment,
      commentedBy: req.user._id,  
    });

    await post.save();

    res.status(200).json({ message: "Comment added successfully", post});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


module.exports.deleteComment = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );
    await post.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
