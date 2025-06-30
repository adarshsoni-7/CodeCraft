const express = require("express");
const router = express.Router({ mergeParams: true });
const { body } = require("express-validator");
const CommentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/comments",
  authMiddleware.authUser,
  body("comment").notEmpty().withMessage("Comment text is required"),
  CommentController.addComment
);

router.delete(
  "/comments/:commentId",
  authMiddleware.authUser,
  CommentController.deleteComment
);

module.exports = router;
