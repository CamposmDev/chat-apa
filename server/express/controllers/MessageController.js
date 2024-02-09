import db from "../../database/index.js";
import JWTAuth from "../middleware/JWTAuth.js";


export default class MessageController {
    async messages(req, res) {
        const { userId } = req.params;
        const token = req.cookies?.token;
        const auth = new JWTAuth()
        const data = auth.parseToken(token);
        const senderId = data.userId;
        const messages = db.messages.get(senderId, userId);
        return res.status(200).json(messages)
    }
}