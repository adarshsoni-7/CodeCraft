const UserModel = require("../models/user.model");

module.exports.createUser = async ({ fullname, email, password, bio, profilePicture }) => {
    if (!fullname || !email || !password) {
        throw new Error("All fields are required");
    }

    const user = await UserModel.create({ fullname, email, password, bio, profilePicture });
    console.log(user);
    return user;
}