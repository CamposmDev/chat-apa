import db from "../../database/index.js";
import MessageModel from "../../database/models/MessageModel.js";
import JWTAuth from "../middleware/JWTAuth.js";


export default class MessageController {
    async messages(req, res) {
        const { userId } = req.params;
        const token = req.cookies?.token;
        const auth = new JWTAuth()
        const senderId = await auth.parseToken(token);
        // console.log(senderId);
        // console.log(userId);
        const messages = await db.messages.get(senderId, userId);
        return res.status(200).json({"messages": messages})
    }
}