const PostModel = require("../models/post.model");
module.exports.isAdmin = async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.postId);
    
        if (!post) {
            return res.status(400).json({ message: "Access denied" });
        }
        console.log("Token user:", req.user);
        console.log("Requested postId:", req.params.postId);
        const isAuthor = post.postedBy.toString() === req.user._id.toString();
    
        if (isAuthor && req.user.isAdmin) {
            return next();
        }
    
    
        return res.status(400).json({ message: "Unauthorized" });
    }

    catch(err) {
        res.status(400).json({ message: err.message });
    }
    
}