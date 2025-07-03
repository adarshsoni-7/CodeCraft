const UserModel = require("../models/user.model");
const BlackListTokenModel = require("../models/BlackListTokenModel");
const UserService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.signUpUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password, bio, profilePicture } = req.body;

    const userAlreadyExists = await UserModel.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ message: "Email has been already registered" });
    }

    const hashPassword = await UserModel.hashPassword(password);

    const user = await UserService.createUser({
      fullname,
      email,
      password: hashPassword,
      bio,
      profilePicture,
    });

    const token = user.genAuthToken();

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const signedUser = await UserModel.findOne({ email }).select("+password");

    if (!signedUser) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatched = await signedUser.comparePassword(password);

    if (!isMatched) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    const token = signedUser.genAuthToken();

    res.cookie("token", token);

    res.status(201).json({ token, signedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getUserProfile = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");

  await BlackListTokenModel.create({
    token: req.cookies.token || req.headers.authorization?.split(" ")[1],
  });

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.updateUsername = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname } = req.body;
    const userId = req.params.userId;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { fullname },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Username updated successfully", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    const userId = req.params.userId;

    const updatedUserByEmail = await UserModel.findByIdAndUpdate(
      userId,
      { email },
      { new: true, runValidators: true }
    );

    if (!updatedUserByEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    res
      .status(200)
      .json({ message: "Email updated successfully", updatedUserByEmail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { currPassword, newPassword } = req.body;

    if (currPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as current password",
      });
    }
    const userId = req.user._id;

    const user = await UserModel.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatched = await user.comparePassword(currPassword);
    if (!isMatched) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashNewPassword = await UserModel.hashPassword(newPassword);
    await UserModel.findByIdAndUpdate(
      userId,
      { password: hashNewPassword },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.updateBio = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { bio } = req.body;

    const userId = req.user._id;

    const updatedUserByBio = await UserModel.findByIdAndUpdate(
      userId,
      { bio },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Bio updated successfully",
      updatedUserByBio,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports.followUser = async (req, res) => {  
  try {

    const targetUserId = req.params.userId;
    const currentUserId = req.user._id;


    if(targetUserId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }


    // Make sure user exists
    const targetUser = await UserModel.findById(targetUserId);

    if(!targetUser) {
      return res.status(400).json({ message: "User not found." });
    }


    // Check if already following
    if(targetUser.followers.includes(currentUserId)) {
      return res.status(400).json({ message: "You already follow this user" });
    }


    // Add follower to the target user
    await UserModel.findByIdAndUpdate(targetUserId, {$addToSet: {followers: currentUserId}});


    // Add following to the current user
    await UserModel.findByIdAndUpdate(currentUserId, {$addToSet: {followings: targetUserId}});

    console.log(targetUser)
     res.status(200).json({ message: "Successfully followed the user"});
  } 

  catch(error) {
    console.log("Error following user:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
