const PostModel = require("../models/post.model");

module.exports.ViewPost = async (req, res) => {
  try {
    
    const post = await PostModel.findById(req.params.postId);

    if (post.postedBy.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Authors cannot increase their own views." });
    }

    if (!post.viewedBy.includes(req.user._id)) {
      post.views += 1;
      post.viewedBy.push(req.user._id);
      await post.save();
    } else {
     return res.status(400).json({ message: "You already viewed this blog" });
    }

    res.status(200).json({ message: "View counted" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
