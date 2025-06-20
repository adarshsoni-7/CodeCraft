const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth.middleware");
const LikeController = require("../controllers/like.controller");

router.put("/like", authMiddleware.authUser, LikeController.LikePost);
router.put("/dislike", authMiddleware.authUser, LikeController.DislikePost);

module.exports = router;
