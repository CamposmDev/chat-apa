import mongoose from "mongoose";
import { UserModel } from "../models/index.js";

export default class MongooseUserDBM {
    async getUserById(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) return null;
        let user = await UserModel.findById({ _id: userId })
        if (!user) return null;
        return user;
    }

    async getUserByUsername(username) {
        let user = await UserModel.findOne({ username: username });
        if (!user) return null;
        return user;
    }

    async getUserByEmail(email) {
        let user = await UserModel.findOne({ email: email });
        if (!user) return null;
        return user;
    }

    async createUser(arg) {
        let user = await UserModel.create({
            name: arg.name,
            email: arg.email,
            username: arg.username,
            password: arg.password,
            friends: []
        })
        if (!user) return null;
        return user;
    }

    async addFriend(userId, friendId) {
        let user = await UserModel.findOne({_id: userId})
        if (!user) return null;
        user.friends.push(friendId);
        user.save();
        return user;
    }

    async removeFriend(userId, friendId) {
        let user = await UserModel.findOne({_id: userId})
        if (!user) return null;
        user.friends.filter(s => s != friendId)
        user.save();
        return user;
    }

    async getFriends(userId) {
        let user = await UserModel.findOne({_id: userId})
        if (!user) return null;
        return user.friends;
    }
}
