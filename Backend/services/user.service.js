const UserModel = require("../models/user.model");

module.exports.createUser = async ({ fullname, email, password }) => {
    if (!fullname || !email || !password) {
        throw new Error("All fields are required");
    }

    const user = await UserModel.create({ fullname, email, password });
    return user;
}