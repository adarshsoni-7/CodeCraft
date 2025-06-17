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
        const { fullname, email, password } = req.body;

        const userAlreadyExists = await UserModel.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ message: "Email has been already registered" });
        }

        const hashPassword = await UserModel.hashPassword(password);

        const user = await UserService.createUser({ fullname, email, password: hashPassword });

        const token = user.genAuthToken();

        res.status(201).json({ token, user });
    }

    catch (error) {
        res.status(400).json({ message: erro  });
    }

}


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
    }

    catch (error) {
        res.status(400).json({ message: error.message});
    }
}


module.exports.getUserProfile = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie("token");

    await BlackListTokenModel.create({ token: req.cookies.token || req.headers.authorization?.split(" ")[1] });
    
    res.status(200).json({ message: "Logged out successfully" });
}