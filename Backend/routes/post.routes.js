const express = require("express");
const router = express.Router({mergeParams: true});
const { body } = require("express-validator");
const AuthMiddleware = require("../middlewares/auth.middleware");
const AdminMiddleware = require("../middlewares/isAdmin.middleware");
const PostController = require("../controllers/post.controller");
const PostModel = require("../models/post.model");
const allowedCategories = [
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

router.get("/", async(req, res) => {
  try {
    const category = req.query.category;

    let post;

    if(category) {
      post = await PostModel.find({ category }).populate("postedBy", "fullname profilePicture ").sort({ createdAt: -1 });
    }
    else {
      post = await PostModel.find().populate("postedBy", "fullname profilePicture ").sort({ createdAt: -1 });
      
    }
    res.json(post);
  }

  catch(error) {
    res.status(500).json({message: "Server error"});
  }
  
})

router.post("/publish", [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("coverImage").notEmpty().withMessage("Image is required"),
  body("category").notEmpty().withMessage("Category is required")
  .isIn(allowedCategories).withMessage("Invalid category selected"),
  body("postedBy").notEmpty().withMessage("User is required"),
  AuthMiddleware.authUser,
  PostController.publishPost,
]);

router.delete("/:postId/delete", AuthMiddleware.authUser, AdminMiddleware.isAdmin, PostController.deletePost);

router.get("/:postId", PostController.getSinglePost);

 


module.exports = router;
