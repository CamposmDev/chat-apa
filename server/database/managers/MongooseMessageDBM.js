import { MessageModel } from "../models/index.js";

export default class MongooseMessageDBM {
    async get(senderId, receipientId) {
        const obj = await MessageModel.find({
            sender: {$in: [senderId, receipientId]},
            recipient: {$in: [senderId, receipientId]}
        }).sort({createdAt: 1})
        return obj;
    }
}