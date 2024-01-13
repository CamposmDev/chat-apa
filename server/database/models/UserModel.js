import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String }
}, { timestamps: true })

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;