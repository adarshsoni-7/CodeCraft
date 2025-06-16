const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const BlackListTokenModel = require("../models/BlackListTokenModel");



module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const isBlackListed = await BlackListTokenModel.findOne({ token: token });

    if (isBlackListed) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

     
    try {
       
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        const loggedInUser = await UserModel.findById(decodedUser.id);

        req.user = loggedInUser;

        return next();
    }

    catch (error) {
        return res.status(400).json({ message: "Unauthorized" });
    }

     
}