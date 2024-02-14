import { MessageModel } from "../models/index.js";

export default class MongooseMessageDBM {
    async get(senderId, receipientId) {
        const message = await MessageModel.find({
            sender: {$in: [senderId, receipientId]},
            recipient: {$in: [senderId, receipientId]},
        }).sort({createdAt: 1})
        return message;
    }

    async create(sender, recipient, text, file) {
        const message = await MessageModel.create({
            sender: sender,
            recipient: recipient,
            text: text,
            file: file
        })
        return message;
    }
}