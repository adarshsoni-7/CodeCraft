const PostModel = require("../models/post.model");
module.exports.publishPost = async ({ title, content, coverImage, category, postedBy }) => {
    if (!title || !content || !coverImage || !category || !postedBy) {
        throw new Error("All fields should be filled while publishing the post");
    }


    const post = await PostModel.create({ title, content, coverImage, category, postedBy });
    return post;
}