const express = require("express");
const router = express.Router({mergeParams: true});
const { body } = require("express-validator");
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
 

router.post(
  "/signup",
  [
    body("fullname")
      .isLength({ min: 4 })
      .withMessage("Fullname must be at least 4 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/(?=.*[A-Z])/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/(?=.*[@])/)
      .withMessage("Password must contain at least one @ symbol"),
  ],
  UserController.signUpUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/(?=.*[A-Z])/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/(?=.*[@])/)
      .withMessage("Password must contain at least one @ symbol"),
  ],
  UserController.loginUser
);

router.get("/profile", authMiddleware.authUser, UserController.getUserProfile);

router.get("/logout", authMiddleware.authUser, UserController.logoutUser);

router.patch(
  "/:userId/username",
  [
    body("fullname")
      .isLength({ min: 4 })
      .withMessage("Fullname must be at least 4 characters long"),
  ],
  authMiddleware.authUser,
  UserController.updateUsername
);


router.patch(
  "/:userId/email",
  [
    body("email")
      .isLength({ min: 4 })
      .withMessage("Email must be at least 4 characters long"),
  ],
  authMiddleware.authUser,
  UserController.updateEmail
);


router.patch(
  "/:userId/password",
  [
    body("currPassword")
      .isLength({ min: 8 })
      .withMessage("Current password must be at least 8 characters long"),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("New password must be at least 8 characters long")
      .matches(/(?=.*[A-Z])/)
      .withMessage("New password must contain at least one uppercase letter")
      .matches(/(?=.*[@])/)
      .withMessage("New password must contain at least one @ symbol"),
  ],
  authMiddleware.authUser,
  UserController.updatePassword
);

router.patch(
  "/:userId/bio",
  [
    body("bio")
      .isLength({ min: 4 })
      .withMessage("Bio must be at least 4 characters long"),
  ],
  authMiddleware.authUser,
  UserController.updateBio
);

module.exports = router;
