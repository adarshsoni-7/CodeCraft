const express = require("express");
const router = express.Router({mergeParams: true});
const AuthMiddleware = require("../middlewares/auth.middleware");
const ViewController = require("../controllers/view.controller");



router.put("/view", AuthMiddleware.authUser, ViewController.ViewPost);


module.exports = router;