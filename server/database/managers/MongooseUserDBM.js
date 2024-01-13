import mongoose from "mongoose";
import { UserModel } from "../models/index.js";

export default class MongooseUserDBM {
    async getUserById(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) return null;
        let user = await UserModel.findById({_id: userId})
        if (!user) return null;
        return user;
    }

    async getUserByUsername(username) {
        let user = await UserModel.findOne({username: username});
        if (!user) return null;
        return user;
    }

    async getUserByEmail(email) {
        let user = await UserModel.findOne({email: email});
        if (!user) return null;
        return user;
    }

    async createUser(firstName, lastName, email, username, password) {
        let user = await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        })
        if (!user) return null;
        return user;
    }
}
