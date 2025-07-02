const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const EmailController = require("../controllers/email.controller");




router.post("/subscribe", authMiddleware.authUser, EmailController.subscribe);


module.exports = router;